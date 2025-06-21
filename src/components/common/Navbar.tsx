import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Logo } from "@/components/common/logo";
import { UserPlus, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { ModeToggle } from "../ui/mode-toggle";
import { useActiveNav } from "@/hooks/useActiveNav";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/bookmarks", label: "Bookmarks" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { y } = useScrollPosition();
  const { isActive } = useActiveNav();

  return (
    <header
      className={`px-4 md:px-6 sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        y > 100 ? "bg-background/80 backdrop-blur-sm" : "bg-background/80"
      }`}
    >
      <div className="flex h-16 items-center justify-between gap-4 w-full max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-2 w-[350px]">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <Link to={link.href}>
                        {" "}
                        <NavigationMenuLink
                          className="py-1.5"
                          active={isActive(link.href)}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}

          <Logo />
        </div>
        {/* center */}
        {/* Navigation menu */}
        <div className="flex items-center gap-6 w-full justify-center max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link to={link.href}>
                    <NavigationMenuLink
                      active={isActive(link.href)}
                      className="text-muted-foreground rounded-full hover:text-primary py-1.5 px-4 font-medium flex flex-row items-center gap-1.5"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="aspect-square max-sm:p-0"
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            <UserPlus
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="hidden md:block text-sm">Sign Up</span>
          </Button>
          <Button
            variant="ghost"
            className="aspect-square max-sm:p-0"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            <LogIn
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="hidden md:block text-sm">Sign In</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
