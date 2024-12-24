const Button = ({ text, onClick }) => {
    return (
      <button onClick={onClick} className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        {text}
      </button>
    );
  };
  
  export default Button;
  