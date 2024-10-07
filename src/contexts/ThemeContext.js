import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

// 버튼을 눌러서 색을 바꿔야함
// 화면단의 글씨는 하얗게 배경은 검은색??
// 바디를 건든다 ?

export const ThemeProvider = ({ children }) => {
  // 테마 상태
  const [theme, setTheme] = useState("light");

  // 테마 변경 기능
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  // 테마가 라이트면 클릭시 다크로,  다크면 라이트로
  // 테마가 다크면 클래스에 다크
  // 테마가 라이트면 클래스명 없이

  useEffect(() => {
    if (theme === "dark") {
      // 태그에 클래스명 추가하는 기능

      document.body.classList.add("dark");
      console.log(theme);
    } else {
      document.body.classList.remove("dark");
      console.log(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
