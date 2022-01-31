import { useCallback, VFC } from "react";

export const LoginComponent: VFC = (props: any) => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="text" name="username" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <div className="button-container">
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};


