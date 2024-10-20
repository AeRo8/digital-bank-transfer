import FontAwesome from "@expo/vector-icons/FontAwesome";

export const Icon = (props: React.ComponentProps<typeof FontAwesome>) => {
  return <FontAwesome size={28} {...props} />;
};
