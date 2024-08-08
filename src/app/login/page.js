import { useState } from "react";

export default function Login() {
    const [step, setStep] = useState(1);
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [loadingDots, setLoadingDots] = useState('');

    const handleIdInput = (e) => {
        if(e.key === 'Enter'){
            setStep(2);
        }
    };

    const handlePwInput = (e) => {
        if(e.key === 'Enter'){
            setStep(3);
            axiosLogin();
        }
    }

    const axiosLogin = () => {
        setLoadingDots('');
        let dots = '';
        const interval = setInterval(() => {
            dots += '.';
            setLoadingDots(dots);
            if(dots.length === 3){
                clearInterval(interval);
            }
        }, 1000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.terminal}>
                <div style={styles.line}>
                    login
                </div>
                {step > 0 && (
                    <div style={styles.line}>
                        id: {step === 1 ? <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            onKeyDown={handleIdInput}
                            style={styles.input}
                            autoFocus
                        /> : id}
                    </div>
                )}
                {step > 1 && (
                    <div style={styles.line}>
                        pw: {step === 2 ? <input
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            onKeyDown={handlePwInput}
                            style={styles.input}
                            autoFocus
                        /> : '*'.repeat(pw.length)}
                    </div>
                )}
                {step === 3 && (
                    <div style={styles.line}>
                        login process working{loadingDots}
                    </div>
                )}
            </div>
        </div>
    );
}

// 스타일 정의
const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000',
      color: '#0f0',
      fontFamily: 'monospace',
      margin: 0,
    },
    terminal: {
      width: '100%',
      height: '100%',
      padding: '20px',
      backgroundColor: '#000',
      border: 'none',
      boxSizing: 'border-box',
    },
    line: {
      margin: '10px 0',
    },
    input: {
      backgroundColor: '#000',
      color: '#0f0',
      border: 'none',
      outline: 'none',
      fontFamily: 'monospace',
    },
  };