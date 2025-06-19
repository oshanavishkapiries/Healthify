import { useLocation } from "react-router-dom";

/**
 * useActiveNav - Hook to get current path and check if a nav link is active
 * @returns { pathname: string, isActive: (href: string) => boolean }
 */
export function useActiveNav() {
  const { pathname } = useLocation();

  // Checks if the link is active (exact match or root for "/")
  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  }

  return { pathname, isActive };
}
