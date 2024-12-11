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
  HELP: "help",
  LOCAL_LIQUID_SHEET: "local_liquid_sheet",
  SHARED_LIQUID_SHEET: "shared_liquid_sheet"
} as const;

export const HOTKEY_SECTIONS = [
  {
    title: "Global Navigation",
    hotkeys: [
      { id: "FOCUS_EDITOR", key: "alt+`", description: "Focus MJML editor" },
      { id: "TOGGLE_HELP", key: "alt+.", description: "Toggle help dialog" }
    ]
  },
  {
    title: "Viewport Manager",
    hotkeys: [
      { id: "TOGGLE_VIEWPORT", key: "alt+1", description: "Toggle viewport menu" },
      { id: "VIEWPORT_DESKTOP", key: "alt+d", description: "Switch to desktop preset" },
      { id: "VIEWPORT_MOBILE", key: "alt+m", description: "Switch to mobile preset" },
      { id: "VIEWPORT_WIDTH", key: "alt+w", description: "Focus width input" },
      { id: "VIEWPORT_HEIGHT", key: "alt+h", description: "Focus height input" }
    ]
  },
  {
    title: "Liquid Manager",
    hotkeys: [
      { id: "TOGGLE_LIQUID", key: "alt+2", description: "Toggle liquid menu" },
      { id: "LIQUID_LOCAL", key: "alt+l", description: "Open local liquid" },
      { id: "LIQUID_SHARED", key: "alt+s", description: "Open shared liquid" }
    ]
  },
  {
    title: "Liquid Injector",
    hotkeys: [
      { id: "LIQUID_SAVE", key: "alt+enter", description: "Save changes" },
      { id: "LIQUID_RESET", key: "alt+backspace", description: "Reset changes" },
      { id: "LIQUID_GENERATE", key: "alt+g", description: "Generate Ascenda template" },
      { id: "LIQUID_EXPAND", key: "alt+e", description: "Toggle expand" }
    ]
  },
  {
    title: "Copy Manager",
    hotkeys: [
      { id: "TOGGLE_COPY", key: "alt+3", description: "Toggle copy menu" },
      { id: "COPY_HTML", key: "alt+h", description: "Copy HTML" },
      { id: "COPY_MJML", key: "alt+m", description: "Copy MJML" },
      { id: "COPY_LOCAL", key: "alt+l", description: "Copy local liquid" },
      { id: "COPY_SHARED", key: "alt+s", description: "Copy shared liquid" }
    ]
  },
  {
    title: "Layout Manager",
    hotkeys: [
      { id: "TOGGLE_LAYOUT", key: "alt+4", description: "Toggle fullscreen" }
    ]
  },
  {
    title: "Theme Manager",
    hotkeys: [
      { id: "TOGGLE_THEME", key: "alt+5", description: "Toggle theme menu" },
      { id: "THEME_LIGHT", key: "alt+l", description: "Switch to light theme" },
      { id: "THEME_DARK", key: "alt+d", description: "Switch to dark theme" },
      { id: "THEME_SYSTEM", key: "alt+s", description: "Switch to system theme" }
    ]
  },
  {
    title: "Info Panel",
    hotkeys: [
      { id: "TOGGLE_INFO", key: "alt+i", description: "Toggle info panel" }
    ]
  },
  {
    title: "MJML Preview",
    hotkeys: [
      { id: "TOGGLE_PREVIEW_SCALE", key: "alt+f", description: "Toggle preview scale mode" },
      { id: "REFRESH_PREVIEW", key: "alt+r", description: "Refresh preview" }
    ]
  }
] as const;

export const HOTKEYS = {
  ...Object.fromEntries(
    HOTKEY_SECTIONS.flatMap(section =>
      section.hotkeys.map(hotkey => [hotkey.id, hotkey.key])
    )
  )
} as const;