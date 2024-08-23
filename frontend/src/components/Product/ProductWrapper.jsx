const ProductWrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto  py-24 md:px-10 px-4">
      {children}
    </div>
  );
};

export default ProductWrapper;
