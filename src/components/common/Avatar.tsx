import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarComponentProps {
  name: string;
  image?: string;
}

export default function AvatarComponent({ name, image }: AvatarComponentProps) {
  return (
    <Avatar>
      <AvatarFallback>{name.toUpperCase().slice(0, 2) || "UN"}</AvatarFallback>
      {image && <AvatarImage src={image} alt={name} />}
    </Avatar>
  );
}

