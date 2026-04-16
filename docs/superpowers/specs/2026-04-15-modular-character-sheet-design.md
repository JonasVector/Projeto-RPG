# Modular Character Sheet System - Design Specification

## Overview

This document outlines the design for a new modular character sheet system that enhances the Akasharium RPG platform with system-specific templates, automated PDF analysis, and improved visual styling while maintaining scalability and consistency.

## Problem Statement

The current character sheet system has limitations in both visual presentation and functionality:
- Generic form-like appearance lacking RPG authenticity
- Limited visual identity per system
- Rigid structure that doesn't adapt to different game systems
- Missing image integration for character portraits
- Inconsistent icon usage across the application

## Goals

1. Create system-specific character sheet templates with authentic RPG appearance
2. Implement automated PDF analysis to extract structure and fields
3. Maintain Akasharium's dark fantasy premium aesthetic while allowing system-specific identity
4. Enable character portrait integration
5. Ensure scalability for future RPG systems
6. Maintain consistency in icon usage across the application

## Architecture

### 1. PDF Analysis Module
- **Location**: `lib/pdf-analyzer.ts`
- **Function**: Automatically scans `FichasdeRPG/` directory and subdirectories
- **Technology**: Uses `pdf-parse` or similar library for text extraction
- **Output**: Generates `system-template-data.json` for each system
- **Features**:
  - Identifies editable fields in PDFs
  - Maps field positions and groupings
  - Extracts section titles and layout structure
  - Stores metadata for template generation

### 2. Template System
- **Location**: `components/templates/{system}/`
- **Structure**:
  ```
  components/templates/
  ├── dnd/
  │   ├── layout.tsx
  │   ├── styles.css
  │   └── metadata.json
  ├── daggerheart/
  │   ├── layout.tsx
  │   ├── styles.css
  │   └── metadata.json
  └── [other systems...]
  ```
- **Features**:
  - System-specific layout components
  - CSS modules for system-specific styling
  - Metadata mapping from PDF analysis

### 3. Template Renderer
- **Location**: `components/ficha/FichaTemplateRenderer.tsx`
- **Function**: Dynamically loads and renders appropriate template
- **Props**:
  - `systemId`: Identifier for the RPG system
  - `characterData`: Character data to populate
  - `onDataChange`: Callback for data updates
- **Features**:
  - Dynamic import of system-specific templates
  - Integration with character image component
  - Responsive layout adaptation
  - Akasharium base styling with system overlays

### 4. Character Image Component
- **Location**: `components/ficha/CharacterImageUpload.tsx`
- **Features**:
  - Drag-and-drop image upload
  - Image preview and positioning
  - System-specific styling integration
  - Data persistence in character structure

### 5. Updated Page Structure
- **Location**: `app/sistemas-de-rpg/[sistema]/personagens/[slug]/edit/page.tsx`
- **Changes**:
  - Replace generic form with template renderer
  - Maintain existing save/load functionality
  - Add image upload capability
  - Preserve existing navigation patterns

## Implementation Details

### Data Flow
1. PDF Analyzer scans `FichasdeRPG/` directory
2. Extracts field structure and layout information
3. Generates system-specific template metadata
4. Template renderer loads appropriate components
5. Character data populates the template
6. User interactions update character data
7. Save functionality persists updated data

### Styling Strategy
- Base Akasharium dark fantasy theme as foundation
- System-specific color overlays and visual elements
- Consistent typography with system-appropriate accents
- Responsive design maintaining readability
- Character portrait integration with system aesthetics

### Icon Management
- Centralized icon mapping in `lib/system-icons.ts`
- PNG icons from `IconesSistema/` directory
- System-specific icons for character sheets
- Consistent usage across all application areas

## Scalability Considerations

### Adding New Systems
1. Place PDF in `FichasdeRPG/` directory
2. Run PDF analyzer to generate template metadata
3. Create minimal template component in `components/templates/`
4. Add system to `lib/systems.ts` configuration
5. System becomes available in application

### Performance Optimization
- Lazy loading of template components
- Caching of PDF analysis results
- Optimized image handling
- Efficient data binding between form and character objects

## Testing Strategy

### Unit Tests
- PDF analyzer functionality
- Template renderer component
- Character image component
- Data serialization/deserialization

### Integration Tests
- End-to-end character creation flow
- Template loading and rendering
- Image upload and display
- Data persistence

### Visual Regression
- Template rendering consistency
- Cross-browser compatibility
- Responsive layout verification

## Risks and Mitigation

### Risk: PDF Analysis Complexity
- **Mitigation**: Start with basic text extraction, enhance gradually
- **Fallback**: Manual template creation for complex layouts

### Risk: Performance Issues
- **Mitigation**: Implement lazy loading and caching
- **Monitoring**: Track render times and optimize bottlenecks

### Risk: Breaking Existing Functionality
- **Mitigation**: Maintain backward compatibility with existing character data
- **Testing**: Comprehensive regression testing before deployment

## Success Metrics

1. Improved user satisfaction with character sheet appearance
2. Successful rendering of all supported RPG systems
3. Proper integration of character portrait functionality
4. Maintained or improved application performance
5. Successful addition of new systems without major rework

## Dependencies

- `pdf-parse` or similar PDF analysis library
- `react-dropzone` or similar for drag-and-drop uploads
- Existing Next.js/React ecosystem
- Current character data persistence system

## Timeline

- Phase 1: PDF analysis module (3 days)
- Phase 2: Template system architecture (4 days)
- Phase 3: Core renderer and image integration (5 days)
- Phase 4: Individual system templates (7 days)
- Phase 5: Testing and refinement (3 days)
- Total estimated: 22 days