export const STORAGE_KEYS = {
  EDITOR_CONTENT: "editor_content",
  EDITOR_AUTO_SAVE: "editor_auto_save",
  PREVIEW_SCALE_MODE: "preview_scale_mode",
  LOCAL_LIQUID: "local_liquid",
  SHARED_LIQUID: "shared_liquid",
  LIQUID_EXPANDED: "liquid_expanded"
} as const;

export const UI_STATE = {
  MJML_EDITOR: "mjml_editor",
  THEME: "theme",
  LIQUID: "liquid",
  COPY: "copy",
  LAYOUT: "layout",
  VIEWPORT: "viewport",
  INFO: "info",
  LOCAL_LIQUID_SHEET: "local_liquid_sheet",
  SHARED_LIQUID_SHEET: "shared_liquid_sheet"
} as const;

export const HOTKEYS = {
  // Global Navigation
  FOCUS_EDITOR: "alt+`",

  // Viewport Manager
  TOGGLE_VIEWPORT: "alt+1",
  VIEWPORT_DESKTOP: "alt+d",
  VIEWPORT_MOBILE: "alt+m",
  VIEWPORT_WIDTH: "alt+w",
  VIEWPORT_HEIGHT: "alt+h",

  // Liquid Manager
  TOGGLE_LIQUID: "alt+2",
  LIQUID_LOCAL: "alt+l",
  LIQUID_SHARED: "alt+s",

  // Copy Manager
  TOGGLE_COPY: "alt+3",
  COPY_HTML: "alt+h",
  COPY_MJML: "alt+m",
  COPY_LOCAL: "alt+l",
  COPY_SHARED: "alt+s",

  // Layout Manager
  TOGGLE_LAYOUT: "alt+4",

  // Theme Manager
  TOGGLE_THEME: "alt+5",
  THEME_LIGHT: "alt+l",
  THEME_DARK: "alt+d",
  THEME_SYSTEM: "alt+s",

  // Info Panel
  TOGGLE_INFO: "alt+i",

  // Liquid Injector
  LIQUID_SAVE: "alt+enter",
  LIQUID_RESET: "alt+r",
  LIQUID_GENERATE: "alt+g",
  LIQUID_EXPAND: "alt+e",

  // MJML Preview
  TOGGLE_PREVIEW_SCALE: "alt+f"
} as const;