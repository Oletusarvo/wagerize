export function withIcon(Component) {
  return ({ children, icon, ...props }) => (
    <Component {...props}>
      {icon}
      {children}
    </Component>
  );
}
