const Header = ({ children, showAll = false }) => {
  return (
    <div
      className={`absolute p-4 w-full bg-[#1D0F46] shadow-md ${
        showAll ? "" : "md:shadow-none md:bg-transparent"
      } `}
    >
      {children}
    </div>
  );
};

export default Header;
