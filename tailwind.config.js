/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        tremor: {
          brand: {
            faint: "#93C5FD",
            muted: "#60A5FA",
            subtle: "#3B82F6",
            DEFAULT: "#2563EB",
            emphasis: "#1D4ED8",
            inverted: "#FFFFFF",
          },
          background: {
            muted: "#F9FAFB",
            subtle: "#F3F4F6",
            DEFAULT: "#FFFFFF",
            emphasis: "#374151",
          },
          border: { DEFAULT: "#E5E7EB" },
          ring: { DEFAULT: "#E5E7EB" },
          content: {
            subtle: "#9CA3AF",
            DEFAULT: "#6B7280",
            emphasis: "#374151",
            strong: "#111827",
            inverted: "#FFFFFF",
          },
        },
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: "#1E3A8A",
            subtle: "#1D4ED8",
            DEFAULT: "#2563EB",
            emphasis: "#60A5FA",
            inverted: "#1E3A8A",
          },
          background: {
            muted: "#131A2B",
            subtle: "#374151",
            DEFAULT: "#1F2937",
            emphasis: "#D1D5DB",
          },
          border: { DEFAULT: "#374151" },
          ring: { DEFAULT: "#374151" },
          content: {
            subtle: "#6B7280",
            DEFAULT: "#9CA3AF",
            emphasis: "#E5E7EB",
            strong: "#F9FAFB",
            inverted: "#1E3A8A",
          },
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        "tremor-input": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "dark-tremor-input": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        "tremor-label": ["0.75rem", [Object]],
        "tremor-default": ["0.875rem", [Object]],
        "tremor-title": ["1.125rem", [Object]],
        "tremor-metric": ["1.875rem", [Object]],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("tailwindcss-animate"),require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
};
