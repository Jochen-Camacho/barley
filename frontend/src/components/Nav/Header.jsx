const Header = ({ children, showAll = false }) => {
  return (
    <div
      className={`absolute p-4 w-full shadow-md min-h-[80px] ${
        showAll
          ? "bg-[#1D0F46]/80 backdrop-blur-md "
          : "bg-[#1D0F46] md:shadow-none md:bg-transparent"
      } `}
    >
      {children}
    </div>
  );
};

export default Header;
