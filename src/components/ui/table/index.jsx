const Table = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};
const TableHeader = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

const TableBody = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};
const TableRow = ({ children, className, ...rest }) => {
  return <tr className={className} {...rest}>{children}</tr>;
};

const TableCell = ({
  children,
  isHeader = false,
  className,
  colSpan,
}) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag colSpan={colSpan} className={` ${className}`}>
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
