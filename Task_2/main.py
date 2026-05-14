from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, get_db

# Automatically create database tables on application startup (SQLite/PostgreSQL)
models.Base.metadata.create_all(bind=engine)

from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse

app = FastAPI(
    title="Tasks Management REST API",
    description="A highly optimized, robust, and secure backend REST API for managing tasks, built using FastAPI, SQLAlchemy, and PostgreSQL/SQLite.",
    version="1.0.0",
    docs_url=None  # Disable default Swagger UI to use our custom themed version below
)

@app.get("/docs", include_in_schema=False)
def custom_swagger_ui_html():
    swagger_html = get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Premium Dark UI",
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
    )
    
    # Modern Premium Dark Blue Slate Theme for Swagger UI (matching Task 1's colors exactly)
    custom_css = """
    <style>
        /* Base page and body styles */
        body {
            background-color: #0f172a !important; /* slate-900 */
            color: #f1f5f9 !important; /* slate-100 */
            font-family: 'Outfit', 'Inter', sans-serif !important;
        }
        .swagger-ui {
            background-color: #0f172a !important;
            filter: invert(0) !important;
        }
        
        /* Main Header, Title, Links & Descriptions */
        .swagger-ui .info {
            margin: 30px 0 !important;
        }
        .swagger-ui .info .title,
        .swagger-ui .info h1,
        .swagger-ui .info h2,
        .swagger-ui .info h3,
        .swagger-ui .info h4,
        .swagger-ui .info h5,
        .swagger-ui .info h6,
        .swagger-ui .info .title *,
        .swagger-ui h1,
        .swagger-ui h2 {
            color: #38bdf8 !important; /* Vibrant Sky blue / Cyan */
            text-shadow: 0 0 15px rgba(56, 189, 248, 0.25) !important;
            font-weight: 800 !important;
            font-size: 38px !important;
            letter-spacing: -0.5px !important;
        }
        .swagger-ui .info, 
        .swagger-ui .info p, 
        .swagger-ui .info li,
        .swagger-ui .info .description,
        .swagger-ui .info .description p,
        .swagger-ui .info .description * {
            color: #cbd5e1 !important; /* Slate-300 (highly readable light gray) */
            font-size: 15.5px !important;
            line-height: 1.7 !important;
        }
        .swagger-ui .info a,
        .swagger-ui .info a:visited,
        .swagger-ui .info a:hover,
        .swagger-ui .info a:active,
        .swagger-ui a,
        .swagger-ui a:visited,
        .swagger-ui a:hover,
        .swagger-ui a:active {
            color: #38bdf8 !important; /* Sky Blue for links */
            text-decoration: none !important;
            font-weight: 600 !important;
            transition: color 0.2s ease !important;
        }
        .swagger-ui .info a:hover,
        .swagger-ui a:hover {
            color: #7dd3fc !important; /* Lighter sky blue on hover */
            text-decoration: underline !important;
        }
        
        /* Version badge customization */
        .swagger-ui .info .version,
        .swagger-ui .info pre.version,
        .swagger-ui .info .oas-version,
        .swagger-ui .info [class*="oas"] {
            background-color: rgba(56, 189, 248, 0.1) !important;
            color: #38bdf8 !important;
            border: 1px solid rgba(56, 189, 248, 0.3) !important;
            padding: 4px 10px !important;
            border-radius: 6px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            margin-left: 10px !important;
            display: inline-block !important;
            font-family: inherit !important;
            height: auto !important;
            width: auto !important;
            line-height: 1.2 !important;
            vertical-align: middle !important;
            position: relative !important;
            top: -2px !important;
        }

        /* Container & Scheme Elements */
        .swagger-ui .scheme-container {
            background-color: #1e293b !important; /* slate-800 card */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
            border: 1px solid rgba(148, 163, 184, 0.1) !important;
            border-radius: 12px !important;
            padding: 20px !important;
        }
        .swagger-ui .opblock {
            background-color: #1e293b !important; /* slate-800 card */
            border-radius: 12px !important;
            border: 1px solid rgba(148, 163, 184, 0.12) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swagger-ui .opblock:hover {
            transform: translateY(-2px) !important;
            border-color: rgba(56, 189, 248, 0.4) !important;
            box-shadow: 0 8px 30px rgba(56, 189, 248, 0.18) !important;
        }
        .swagger-ui .opblock .opblock-summary-path {
            color: #f1f5f9 !important;
            font-weight: 600 !important;
        }
        .swagger-ui .opblock .opblock-summary-description {
            color: #cbd5e1 !important; /* Slate-300 (brighter description text on operation summary) */
            font-weight: 500 !important;
        }
        .swagger-ui .opblock-tag {
            color: #38bdf8 !important;
            border: 1px solid rgba(56, 189, 248, 0.2) !important;
            border-radius: 16px !important;
            background: rgba(30, 41, 59, 0.7) !important;
            backdrop-filter: blur(12px) !important;
            box-shadow: 0 10px 45px rgba(0, 0, 0, 0.4) !important;
            padding: 12px 18px !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            margin-bottom: 15px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swagger-ui .opblock-tag:hover {
            transform: translateY(-2px) !important;
            border-color: rgba(56, 189, 248, 0.35) !important;
            box-shadow: 0 8px 30px rgba(56, 189, 248, 0.12) !important;
            background-color: #111b30 !important;
        }

        /* Opblock Sections (Parameters & Responses Section Headers) */
        .swagger-ui .opblock-section-header {
            background-color: #1e293b !important; /* Slate-800 */
            color: #38bdf8 !important; /* Sky Blue */
            border-bottom: 1px solid rgba(56, 189, 248, 0.2) !important;
            padding: 10px 16px !important;
        }
        .swagger-ui .opblock-section-header h4,
        .swagger-ui .opblock-section-header h4 * {
            color: #38bdf8 !important;
            font-weight: 700 !important;
            font-size: 16px !important;
        }
        
        /* "No parameters" / "No responses" notices readability */
        .swagger-ui .opblock-body .opblock-section-header + p,
        .swagger-ui .opblock-body .opblock-section-header + div,
        .swagger-ui .opblock-body .opblock-section-header + p em,
        .swagger-ui .opblock-body .opblock-section-header + div em,
        .swagger-ui .opblock-body p,
        .swagger-ui .opblock-body div.no-margin,
        .swagger-ui .opblock-body div.no-margin p,
        .swagger-ui .opblock-body p.no-margin,
        .swagger-ui .opblock-description-wrapper p {
            color: #cbd5e1 !important; /* Slate-300 (highly legible near-white) */
            font-size: 14.5px !important;
            font-weight: 500 !important;
        }

        /* Tables & Row details styling (Parameters, Responses, Headers) */
        .swagger-ui table thead tr td, 
        .swagger-ui table thead tr th,
        .swagger-ui table thead tr th * {
            color: #38bdf8 !important; /* Vibrant sky blue headers */
            font-weight: 700 !important;
            border-bottom: 2px solid rgba(56, 189, 248, 0.2) !important;
            font-size: 14px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
        }
        
        /* Parameters details readability */
        .swagger-ui .parameter__name,
        .swagger-ui .parameter__name * {
            color: #38bdf8 !important; /* Bright sky blue for parameter names */
            font-weight: 600 !important;
            font-size: 14.5px !important;
        }
        .swagger-ui .parameter__type,
        .swagger-ui .parameter__type * {
            color: #34d399 !important; /* Light green/emerald for parameter types */
            font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
            font-size: 13px !important;
            font-weight: 600 !important;
        }
        .swagger-ui .parameter__desc,
        .swagger-ui .parameter__desc *,
        .swagger-ui .parameter__desc p {
            color: #cbd5e1 !important; /* Bright Slate-300 for parameter descriptions */
            font-size: 14px !important;
            line-height: 1.5 !important;
        }
        .swagger-ui .parameter__in {
            color: #fbbf24 !important; /* Amber for parameter source location */
            font-style: italic !important;
            font-weight: 500 !important;
        }
        .swagger-ui .parameter__required {
            color: #ef4444 !important; /* Bright Red */
            font-weight: bold !important;
        }

        /* Responses details readability */
        .swagger-ui .responses-table {
            background-color: #0f172a !important;
        }
        .swagger-ui .responses-wrapper {
            background-color: #1e293b !important;
            border-radius: 8px !important;
            padding: 8px !important;
        }
        .swagger-ui .response-col_status,
        .swagger-ui .response-col_status * {
            color: #38bdf8 !important; /* Bright cyan status code */
            font-weight: 700 !important;
            font-size: 15px !important;
        }
        .swagger-ui .response-col_description,
        .swagger-ui .response-col_description-wrapper,
        .swagger-ui .response-col_description *,
        .swagger-ui .response-col_description p {
            color: #e2e8f0 !important; /* Bright Slate-200 for response descriptions */
            font-size: 14.5px !important;
            line-height: 1.6 !important;
        }
        .swagger-ui .response-col_links,
        .swagger-ui .response-col_links * {
            color: #cbd5e1 !important; /* Slate-300 */
            font-size: 14px !important;
        }
        
        /* Tab lists in Response Media Types */
        .swagger-ui .tabli {
            color: #94a3b8 !important;
        }
        .swagger-ui .tabli.active a {
            color: #38bdf8 !important;
            border-bottom: 2px solid #38bdf8 !important;
        }

        /* Input Controls, textareas and selects */
        .swagger-ui select, 
        .swagger-ui input[type=text],
        .swagger-ui textarea {
            background-color: #0f172a !important; /* Slate-900 background */
            color: #f1f5f9 !important; /* White text */
            border: 1px solid rgba(56, 189, 248, 0.25) !important;
            border-radius: 6px !important;
            padding: 6px 12px !important;
            font-family: inherit !important;
            font-size: 14px !important;
            transition: all 0.2s ease !important;
        }
        .swagger-ui select:focus, 
        .swagger-ui input[type=text]:focus,
        .swagger-ui textarea:focus {
            outline: none !important;
            border-color: #38bdf8 !important;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.35) !important;
        }
        
        /* Premium Buttons (Try it out, Cancel, Execute, primary blue button) */
        .swagger-ui .btn {
            font-family: inherit !important;
            font-weight: bold !important;
            border-radius: 8px !important;
            padding: 6px 14px !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swagger-ui .btn.try-out__btn {
            background-color: rgba(56, 189, 248, 0.1) !important;
            color: #38bdf8 !important;
            border: 1px solid rgba(56, 189, 248, 0.3) !important;
        }
        .swagger-ui .btn.try-out__btn:hover {
            background-color: rgba(56, 189, 248, 0.25) !important;
            border-color: #38bdf8 !important;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.3) !important;
        }
        .swagger-ui .btn.try-out__btn.cancel {
            background-color: rgba(239, 68, 68, 0.1) !important;
            color: #ef4444 !important;
            border-color: rgba(239, 68, 68, 0.3) !important;
        }
        .swagger-ui .btn.try-out__btn.cancel:hover {
            background-color: rgba(239, 68, 68, 0.25) !important;
            border-color: #ef4444 !important;
            box-shadow: 0 0 12px rgba(239, 68, 68, 0.3) !important;
        }
        .swagger-ui .btn.execute {
            background-color: #10b981 !important; /* Emerald green */
            color: #ffffff !important;
            border: none !important;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2) !important;
        }
        .swagger-ui .btn.execute:hover {
            background-color: #059669 !important;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4) !important;
        }
        .swagger-ui .btn.auth {
            background-color: #3b82f6 !important;
            color: #ffffff !important;
            border: none !important;
        }
        .swagger-ui .btn.auth:hover {
            background-color: #2563eb !important;
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.3) !important;
        }

        /* Method specific endpoint blocks overrides */
        .swagger-ui .opblock.opblock-post {
            border-left: 5px solid #10b981 !important;
            background-color: rgba(16, 185, 129, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-get {
            border-left: 5px solid #3b82f6 !important;
            background-color: rgba(59, 130, 246, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-patch {
            border-left: 5px solid #eab308 !important;
            background-color: rgba(234, 179, 8, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-delete {
            border-left: 5px solid #ef4444 !important;
            background-color: rgba(239, 68, 68, 0.05) !important;
        }
        .swagger-ui .opblock.opblock-post .opblock-summary-method { background-color: #10b981 !important; }
        .swagger-ui .opblock.opblock-get .opblock-summary-method { background-color: #3b82f6 !important; }
        .swagger-ui .opblock.opblock-patch .opblock-summary-method { background-color: #eab308 !important; }
        .swagger-ui .opblock.opblock-delete .opblock-summary-method { background-color: #ef4444 !important; }

        /* JSON Codeblocks, Pre, Code & syntax highlight overrides */
        .swagger-ui pre,
        .swagger-ui pre.microlight,
        .swagger-ui .opblock-body pre {
            background-color: #0f172a !important; /* Slate-900 background */
            color: #f1f5f9 !important; /* White text */
            border: 1px solid rgba(148, 163, 184, 0.15) !important;
            border-radius: 8px !important;
            font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
            padding: 14px !important;
            margin: 10px 0 !important;
            display: block !important;
            overflow-x: auto !important;
        }
        .swagger-ui pre span {
            color: #f1f5f9 !important;
        }
        /* JSON keys highlighted in bright sky blue */
        .swagger-ui pre .hljs-attr,
        .swagger-ui .microlight .hljs-attr {
            color: #38bdf8 !important;
            font-weight: 600 !important;
        }
        /* JSON strings highlighted in bright emerald green */
        .swagger-ui pre .hljs-string,
        .swagger-ui .microlight .hljs-string {
            color: #34d399 !important;
        }
        /* JSON numbers, booleans, and null values in gold */
        .swagger-ui pre .hljs-number,
        .swagger-ui .microlight .hljs-number,
        .swagger-ui pre .hljs-literal,
        .swagger-ui .microlight .hljs-literal {
            color: #fbbf24 !important;
            font-weight: 500 !important;
        }

        /* Inline code elements (e.g. parameter types, Controls Accept header, etc.) */
        .swagger-ui code,
        .swagger-ui .response-controls code,
        .swagger-ui .parameter__empty_span code {
            display: inline-block !important;
            background-color: rgba(56, 189, 248, 0.08) !important; /* Subtle sky blue tint */
            color: #34d399 !important; /* Soft Emerald Green */
            border: 1px solid rgba(56, 189, 248, 0.15) !important;
            border-radius: 4px !important;
            padding: 2px 6px !important;
            margin: 0 4px !important;
            font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            line-height: normal !important;
            width: auto !important;
            height: auto !important;
        }
        
        /* Specifically target the "Controls Accept header" container to ensure perfect margins and zero overlapping */
        .swagger-ui .response-controls,
        .swagger-ui .response-control {
            margin-top: 8px !important;
            margin-bottom: 12px !important;
            display: block !important;
            clear: both !important;
        }

        /* Models / Schemas Sections */
        .swagger-ui section.models {
            border: 1px solid rgba(56, 189, 248, 0.2) !important;
            border-radius: 16px !important;
            background: rgba(30, 41, 59, 0.7) !important;
            backdrop-filter: blur(12px) !important;
            box-shadow: 0 10px 45px rgba(0, 0, 0, 0.4) !important;
            padding: 12px 18px !important;
        }
        .swagger-ui section.models h4 {
            color: #38bdf8 !important;
            font-size: 18px !important;
            font-weight: 700 !important;
            letter-spacing: 0.8px !important;
            text-transform: uppercase !important;
            border-bottom: 1px solid rgba(56, 189, 248, 0.15) !important;
            padding-bottom: 10px !important;
            margin-bottom: 15px !important;
        }
        .swagger-ui section.models h4 svg {
            fill: #38bdf8 !important;
        }
        .swagger-ui section.models .model-container {
            background-color: #0f172a !important;
            border: 1px solid rgba(148, 163, 184, 0.08) !important;
            border-radius: 12px !important;
            margin: 12px 0 !important;
            padding: 8px 12px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .swagger-ui section.models .model-container:hover {
            transform: translateY(-2px) !important;
            border-color: rgba(56, 189, 248, 0.35) !important;
            box-shadow: 0 8px 30px rgba(56, 189, 248, 0.12) !important;
            background-color: #111b30 !important;
        }
        .swagger-ui .model-box {
            background-color: transparent !important;
            color: #cbd5e1 !important;
        }
        .swagger-ui section.models .model-box-control,
        .swagger-ui section.models .model-box-control *,
        .swagger-ui section.models .model-title,
        .swagger-ui section.models .model-title * {
            color: #f1f5f9 !important; /* Force extremely bright white font color for maximum contrast */
            font-size: 15.5px !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
            text-decoration: none !important;
        }
        .swagger-ui .model-box-control {
            outline: none !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            display: inline-flex !important;
            align-items: center !important;
            padding: 0 !important;
            cursor: pointer !important;
        }
        .swagger-ui section.models .model-box-control:hover,
        .swagger-ui section.models .model-box-control:hover * {
            color: #38bdf8 !important; /* Glowing cyan on hover */
        }
        .swagger-ui .model-hint {
            color: #ffffff !important; /* Pure white font color for hints (object, array, string) */
            font-size: 12px !important;
            font-weight: 600 !important;
            margin-left: 10px !important;
        }
        
        /* Expand/collapse button and custom buttons to eliminate white backgrounds */
        .swagger-ui section.models button,
        .swagger-ui section.models .model-toggle,
        .swagger-ui .model-box-control button {
            background: rgba(56, 189, 248, 0.08) !important;
            color: #38bdf8 !important;
            border: 1px solid rgba(56, 189, 248, 0.2) !important;
            border-radius: 6px !important;
            padding: 4px 10px !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            margin-left: 12px !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: none !important;
            cursor: pointer !important;
            outline: none !important;
        }
        
        .swagger-ui section.models button:hover,
        .swagger-ui section.models .model-toggle:hover,
        .swagger-ui .model-box-control button:hover {
            background: rgba(56, 189, 248, 0.2) !important;
            color: #ffffff !important;
            border-color: #38bdf8 !important;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.3) !important;
        }
        
        .swagger-ui .model-toggle {
            fill: #38bdf8 !important;
            background: transparent !important;
            border: none !important;
            margin-left: 8px !important;
            padding: 0 !important;
        }
        
        /* Aggressive pure white/light-slate override for ALL elements inside schemas to ensure 100% readability */
        .swagger-ui section.models .model,
        .swagger-ui section.models .model *,
        .swagger-ui .json-schema-2020-12-accordion,
        .swagger-ui .json-schema-2020-12-accordion *,
        .swagger-ui .model-box,
        .swagger-ui .model-box * {
            color: #f1f5f9 !important; /* Slate-100 for maximum readability */
        }
        
        /* Highlight property names/keys in vibrant sky blue */
        .swagger-ui section.models .prop-name,
        .swagger-ui section.models .prop-name *,
        .swagger-ui .model-box .prop-name,
        .swagger-ui .model-box .prop-name *,
        .swagger-ui .json-schema-2020-12-accordion button,
        .swagger-ui .json-schema-2020-12-accordion button *,
        .swagger-ui .json-schema-2020-12-accordion summary,
        .swagger-ui .json-schema-2020-12-accordion summary * {
            color: #38bdf8 !important; /* Vibrant Sky Blue */
            font-weight: 600 !important;
        }

        /* Style the expand/collapse buttons specifically to retain their premium button styles */
        .swagger-ui section.models button.model-box-control,
        .swagger-ui section.models button.model-box-control *,
        .swagger-ui section.models button.expand-methods,
        .swagger-ui section.models button.expand-operation,
        .swagger-ui section.models .model-toggle,
        .swagger-ui section.models .model-toggle * {
            color: #38bdf8 !important;
        }

        /* Ensure type hints like string, array, integer, object, any are highlighted in elegant green */
        .swagger-ui .model-box .prop-type,
        .swagger-ui .model-box .prop-format,
        .swagger-ui .json-schema-2020-12-accordion .json-schema-2020-12-type,
        .swagger-ui .json-schema-2020-12-accordion .type,
        .swagger-ui .json-schema-2020-12-accordion .prop-type {
            color: #34d399 !important; /* Light green/emerald for data types */
            font-weight: 600 !important;
        }

        /* Model property descriptions readability */
        .swagger-ui .prop-desc,
        .swagger-ui .prop-desc *,
        .swagger-ui .model-box .prop-desc,
        .swagger-ui .model-box .prop-desc * {
            color: #cbd5e1 !important; /* Slate-300 */
        }

        /* Keep required indicator '*' as a bright coral red for clear visibility */
        .swagger-ui .json-schema-2020-12-accordion .required,
        .swagger-ui .json-schema-2020-12-accordion .required *,
        .swagger-ui .model-box .required,
        .swagger-ui .model-box .required * {
            color: #f87171 !important; /* Bright coral red */
        }
        
        .swagger-ui .model .property {
            border-bottom: 1px solid rgba(148, 163, 184, 0.05) !important;
            padding: 8px 0 !important;
        }
        .swagger-ui .model-box .model-jump-to-path {
            color: #38bdf8 !important;
        }
        .swagger-ui .model-box-control:focus {
            outline: none !important;
        }

        /* =====================================================
           TOGGLE BUTTONS & EXPAND/COLLAPSE ARROWS — LIGHT FIX
           All arrows/chevrons made bright so visible on dark bg
           ===================================================== */

        /* Opblock (endpoint) expand/collapse arrow */
        .swagger-ui .opblock-summary-control,
        .swagger-ui .opblock-summary-control:focus {
            outline: none !important;
            background: transparent !important;
        }
        .swagger-ui .opblock-summary-control svg,
        .swagger-ui .opblock-summary-control svg path,
        .swagger-ui .opblock-summary-control svg polygon,
        .swagger-ui .opblock-summary-control svg rect {
            fill: #f1f5f9 !important; /* Bright white-slate arrow */
        }

        /* Generic .arrow class used by Swagger UI for all toggle chevrons */
        .swagger-ui .arrow,
        .swagger-ui .arrow svg,
        .swagger-ui .arrow svg path,
        .swagger-ui .arrow svg polygon {
            fill: #38bdf8 !important; /* Sky blue */
        }

        /* Expand/Collapse buttons on opblock headers */
        .swagger-ui .opblock-control-arrow,
        .swagger-ui .opblock-control-arrow svg,
        .swagger-ui .opblock-control-arrow svg path {
            fill: #f1f5f9 !important;
        }

        /* Tag section expand/collapse arrow (group headers) */
        .swagger-ui .opblock-tag-section .arrow,
        .swagger-ui .opblock-tag svg,
        .swagger-ui .opblock-tag svg path,
        .swagger-ui .opblock-tag button svg,
        .swagger-ui .opblock-tag button svg path {
            fill: #38bdf8 !important;
        }

        /* Model section toggle arrows */
        .swagger-ui .model-toggle,
        .swagger-ui .model-toggle svg,
        .swagger-ui .model-toggle svg path,
        .swagger-ui section.models svg,
        .swagger-ui section.models svg path,
        .swagger-ui section.models svg polygon {
            fill: #38bdf8 !important;
        }

        /* Schemas expand/collapse arrow button (top-level models h4 svg) */
        .swagger-ui section.models h4 svg,
        .swagger-ui section.models h4 svg path {
            fill: #38bdf8 !important;
        }

        /* Any remaining SVG icons (e.g. copy, lock, info) */
        .swagger-ui svg.arrow,
        .swagger-ui button svg {
            fill: #cbd5e1 !important; /* Slate-300 light default */
        }

        /* Authorize lock icon — keep gold */
        .swagger-ui .authorization__btn svg,
        .swagger-ui .authorization__btn svg path {
            fill: #fbbf24 !important;
        }

        /* "Expand all" / "Collapse all" text buttons */
        .swagger-ui .expand-methods,
        .swagger-ui .expand-operation {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }
        .swagger-ui .expand-methods svg,
        .swagger-ui .expand-methods svg path,
        .swagger-ui .expand-operation svg,
        .swagger-ui .expand-operation svg path {
            fill: #38bdf8 !important;
        }
    </style>
    """
    
    html_content = swagger_html.body.decode("utf-8")
    injected_html = html_content.replace("</head>", f"{custom_css}</head>")
    return HTMLResponse(content=injected_html, status_code=200)

# API ROOT welcome route
@app.get("/", tags=["Root"])
def root_welcome():
    return {
        "status": "online",
        "message": "Welcome to the Tasks Management REST API! Explore documentation at /docs",
        "documentation": "/docs"
    }


# 1. POST /tasks: Create a new task (Status: 201 Created)
@app.post("/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED, tags=["Tasks"])
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# 2. GET /tasks: List tasks with status filtering and pagination
@app.get("/tasks", response_model=List[schemas.TaskResponse], tags=["Tasks"])
def get_tasks(
    status_filter: Optional[models.TaskStatus] = Query(None, alias="status", description="Filter tasks by status (todo, in_progress, done)"),
    page: int = Query(1, ge=1, description="Page number (starting from 1)"),
    limit: int = Query(20, ge=1, le=100, description="Number of items per page"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)
    
    # Apply filtering if status_filter is supplied
    if status_filter:
        query = query.filter(models.Task.status == status_filter)
    
    # Calculate offset and slice list for pagination
    offset = (page - 1) * limit
    tasks = query.order_by(models.Task.id.desc()).offset(offset).limit(limit).all()
    return tasks

# 3. GET /tasks/{id}: Retrieve a single task by ID
@app.get("/tasks/{id}", response_model=schemas.TaskResponse, tags=["Tasks"])
def get_task_by_id(id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Task with ID {id} does not exist"
        )
    return db_task

# 4. PATCH /tasks/{id}: Partial update of task attributes
@app.patch("/tasks/{id}", response_model=schemas.TaskResponse, tags=["Tasks"])
def update_task(id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Task with ID {id} does not exist"
        )
    
    # Exclude non-provided fields to execute a true PATCH partial-update
    update_data = task_update.dict(exclude_unset=True)
    if not update_data:
        # Return untouched task if no update parameters are passed
        return db_task
        
    for key, value in update_data.items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

# 5. DELETE /tasks/{id}: Remove a task by ID
@app.delete("/tasks/{id}", status_code=status.HTTP_200_OK, tags=["Tasks"])
def delete_task(id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Task with ID {id} does not exist"
        )
        
    db.delete(db_task)
    db.commit()
    return {
        "status": "success",
        "message": f"Task with ID {id} has been successfully deleted"
    }
