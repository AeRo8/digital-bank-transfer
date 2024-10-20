import FontAwesome from "@expo/vector-icons/FontAwesome";

export const Icon = (props: React.ComponentProps<typeof FontAwesome>) => {
  const { className, ...rest } = props;

  return (
    <FontAwesome
      size={28}
      className={`${styles.icon} ${className}`}
      {...rest}
    />
  );
};

const styles = {
  icon: "mb-[-3]",
};
