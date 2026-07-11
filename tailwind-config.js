tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "outline": "#8e6f75",
                "on-surface": "#161d1f",
                "on-tertiary-container": "#4c3e00",
                "inverse-surface": "#2b3234",
                "surface-dim": "#d4dbdd",
                "primary-fixed-dim": "#ffb1c1",
                "on-error-container": "#93000a",
                "inverse-on-surface": "#ebf2f4",
                "surface-container-lowest": "#ffffff",
                "secondary-fixed-dim": "#00daf3",
                "surface-container": "#e8eff1",
                "surface-variant": "#dde4e6",
                "surface-tint": "#bb0054",
                "tertiary-fixed": "#ffe170",
                "background": "#f4fafd",
                "secondary-fixed": "#9cf0ff",
                "secondary-container": "#00e3fd",
                "on-secondary-fixed": "#001f24",
                "surface": "#f4fafd",
                "on-secondary": "#ffffff",
                "tertiary-fixed-dim": "#e9c400",
                "on-primary-fixed": "#3f0018",
                "secondary": "#006875",
                "primary-fixed": "#ffd9df",
                "on-background": "#161d1f",
                "on-tertiary-fixed": "#221b00",
                "tertiary-container": "#c9a900",
                "outline-variant": "#e2bdc3",
                "on-surface-variant": "#5a4045",
                "surface-container-highest": "#dde4e6",
                "surface-container-high": "#e2e9ec",
                "primary": "#b70052",
                "on-primary-fixed-variant": "#8f003f",
                "primary-container": "#dd2269",
                "tertiary": "#705d00",
                "on-tertiary": "#ffffff",
                "error-container": "#ffdad6",
                "on-secondary-fixed-variant": "#004f58",
                "on-error": "#ffffff",
                "on-tertiary-fixed-variant": "#544600",
                "surface-container-low": "#eef5f7",
                "surface-bright": "#f4fafd",
                "error": "#ba1a1a",
                "on-primary": "#ffffff",
                "on-secondary-container": "#00616d",
                "inverse-primary": "#ffb1c1",
                "on-primary-container": "#fffbff"
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                full: "9999px"
            },
            spacing: {
                "margin-desktop": "40px",
                "gutter": "20px",
                "base": "8px",
                "lg": "48px",
                "xl": "80px",
                "xs": "4px",
                "sm": "12px",
                "margin-mobile": "16px",
                "md": "24px"
            },
            fontFamily: {
                "display-lg": ["Plus Jakarta Sans"],
                "headline-lg": ["Plus Jakarta Sans"],
                "body-md": ["Quicksand"],
                "headline-lg-mobile": ["Plus Jakarta Sans"],
                "label-md": ["Plus Jakarta Sans"]
            },
            fontSize: {
                "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
                "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "500" }],
                "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
                "label-md": ["14px", { lineHeight: "20px", fontWeight: "700" }]
            }
        }
    }
};