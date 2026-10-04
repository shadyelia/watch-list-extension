import { createTheme } from "@mui/material/styles";

/**
 * Custom dark theme for the Watch List extension.
 *
 * Palette:
 *   - Background: deep blue-grey (#0f1118 / #181a24)
 *   - Primary:    soft violet (#a78bfa)
 *   - Secondary:  teal accent (#5eead4)
 *   - Surface:    translucent glass panels
 */
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a78bfa",      // soft violet
      light: "#c4b5fd",
      dark: "#7c3aed",
    },
    secondary: {
      main: "#5eead4",      // teal accent
      light: "#99f6e4",
      dark: "#14b8a6",
    },
    background: {
      default: "#0f1118",
      paper: "#181a24",
    },
    text: {
      primary: "#e8e8ee",
      secondary: "#9ca3af",
    },
    divider: "rgba(255,255,255,0.06)",
    error: {
      main: "#f87171",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontSize: 13,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "6px 14px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px !important",
          border: "1px solid rgba(255,255,255,0.08) !important",
          "&.Mui-selected": {
            backgroundColor: "rgba(167,139,250,0.18)",
            borderColor: "rgba(167,139,250,0.4) !important",
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: 4,
        },
        grouped: {
          "&:not(:first-of-type)": {
            borderLeft: "1px solid rgba(255,255,255,0.08) !important",
            marginLeft: 0,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "rgba(167,139,250,0.5)",
          "&.Mui-checked": {
            color: "#a78bfa",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          backgroundColor: "#252836",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
  },
});

export default theme;
