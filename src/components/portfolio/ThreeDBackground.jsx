import { useTheme } from "@/hooks/useTheme";

const ThreeDBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="three-d-background" aria-hidden="true">
      <iframe
        src={`/3d-background.html?theme=${theme}`}
        title="3D Background"
        loading="lazy"
        scrolling="no"
      />
    </div>
  );
};

export default ThreeDBackground;