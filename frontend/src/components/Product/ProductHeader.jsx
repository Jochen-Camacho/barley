const ProductHeader = ({ header, children }) => {
  return (
    <h2
      className="scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0 bg-gray-50 p-4 
flex items-center align-middle"
    >
      <div className="flex items-center justify-between w-full">
        {header}
        {children}
      </div>
    </h2>
  );
};

export default ProductHeader;
