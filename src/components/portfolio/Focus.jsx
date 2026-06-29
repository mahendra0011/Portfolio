import FlowingMenu from "@/components/FlowingMenu";

const focusItems = [
  {
    link: "#",
    text: "Frontend",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=150&fit=crop"
  },
  {
    link: "#",
    text: "Backend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=150&fit=crop"
  },
  {
    link: "#",
    text: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=150&fit=crop"
  },
  {
    link: "#",
    text: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300&h=150&fit=crop"
  }
];

const Focus = () => {
  return (
    <section id="focus" className="relative w-full h-screen">
      <FlowingMenu
        items={focusItems}
        speed={12}
        textColor="#fff"
        bgColor="#120F17"
        marqueeBgColor="#fff"
        marqueeTextColor="#120F17"
        borderColor="rgba(255,255,255,0.15)"
      />
    </section>
  );
};

export default Focus;