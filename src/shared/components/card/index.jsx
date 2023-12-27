// eslint-disable-next-line react/prop-types
const Index = ({
  children,
  headerText,
  subHeaderText,
  customClass,
  isCentered,
}) => {
  const baseClasses =
    'py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none';
  const textCenter = isCentered ? 'text-center' : '';
  return (
    <div className={`${baseClasses} ${customClass}`}>
      <h2 className={`text-xl font-semibold m-6 ${textCenter}`}>
        {headerText}
      </h2>
      {subHeaderText && <p className="text-gray-600 mb-4">{subHeaderText}</p>}
      {children}
    </div>
  );
};

export default Index;
