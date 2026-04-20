import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
    siteKey: string;
    onVerify: (token: string) => void;
    onError?: (error: any) => void;
    onExpire?: () => void;
    theme?: "light" | "dark" | "auto";
}

declare global {
    interface Window {
        turnstile: {
            render: (element: string | HTMLElement, options: any) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

export function TurnstileWidget({ 
    siteKey, 
    onVerify, 
    onError, 
    onExpire,
    theme = "auto" 
}: TurnstileWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    useEffect(() => {
        const renderWidget = () => {
            if (window.turnstile && containerRef.current && !widgetIdRef.current) {
                widgetIdRef.current = window.turnstile.render(containerRef.current, {
                    sitekey: siteKey,
                    callback: onVerify,
                    "error-callback": onError,
                    "expired-callback": onExpire,
                    theme: theme,
                });
            }
        };

        // Check if script is already loaded
        if (window.turnstile) {
            renderWidget();
        } else {
            // Wait for script to load if not already there
            const interval = setInterval(() => {
                if (window.turnstile) {
                    renderWidget();
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
            }
        };
    }, [siteKey, onVerify, onError, onExpire, theme]);

    return <div ref={containerRef} className="flex justify-center my-4" />;
}
