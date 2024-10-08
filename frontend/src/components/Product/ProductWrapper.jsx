const ProductWrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto  pt-24 md:pt-16 md:pb-8 md:px-10 px-4">
      {children}
    </div>
  );
};

export default ProductWrapper;
