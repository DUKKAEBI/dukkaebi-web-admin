import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>문제가 발생했습니다</h2>
          <details style={{ whiteSpace: "pre-wrap", textAlign: "left", maxWidth: "800px", margin: "20px auto" }}>
            <summary>에러 상세 정보</summary>
            <p>{this.state.error?.toString()}</p>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: "10px 20px", 
              fontSize: "16px", 
              cursor: "pointer",
              background: "#00b4b7",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            페이지 새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
