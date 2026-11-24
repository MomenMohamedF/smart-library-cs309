import { useState } from "react";
import "./Register.css";

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6.5C10.3 5.2 7.8 4.6 4 4.8v13c3.8-.2 6.3.4 8 1.7 1.7-1.3 4.2-1.9 8-1.7v-13c-3.8-.2-6.3.4-8 1.7Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.2-3.6 4.2-5.5 8-5.5s6.8 1.9 8 5.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ off }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (values.fullName.trim().length < 3) errors.fullName = "Enter your full name (at least 3 characters).";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.password.length < 8) errors.password = "Use at least 8 characters.";
  if (values.confirm !== values.password) errors.confirm = "Passwords do not match.";
  if (!values.terms) errors.terms = "You need to accept the terms to continue.";
  return errors;
}

function Register() {
  const [values, setValues] = useState({ fullName: "", email: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      // TODO: connect to the register API here
      setSubmitted(true);
    }
  };

  return (
    <div className="register">
      {/* Brand panel */}
      <aside className="register-brand">
        <a href="/" className="register-logo">
          <span className="register-logo__mark"><BookIcon /></span>
          <span className="register-logo__text">smart<span>library</span></span>
        </a>

        <div className="register-brand__body">
          <p className="register-eyebrow register-eyebrow--light">Join the library</p>
          <h2 className="register-brand__title">
            Start your <em>reading journey.</em>
          </h2>
          <p className="register-brand__text">
            Create a free account to borrow books, save your favorites, and get recommendations that fit your taste.
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="register-panel">
        <div className="register-card">
          {submitted ? (
            <div className="register-success" role="status">
              <h1 className="register-title">Account <em>created</em></h1>
              <p className="register-subtitle">
                Welcome, {values.fullName.split(" ")[0]}. You can sign in with your email and password now.
              </p>
              <a href="/" className="register-btn">Go to sign in</a>
            </div>
          ) : (
            <>
              <p className="register-eyebrow">Create account</p>
              <h1 className="register-title">
                Sign up for <em>free</em>
              </h1>
              <p className="register-subtitle">It takes less than a minute to get started.</p>

              <form className="register-form" onSubmit={handleSubmit} noValidate>
                <div className="register-field">
                  <label htmlFor="fullName">Full name</label>
                  <div className={`register-input ${errors.fullName ? "has-error" : ""}`}>
                    <span className="register-input__icon"><UserIcon /></span>
                    <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Your full name" value={values.fullName} onChange={handleChange} />
                  </div>
                  {errors.fullName && <span className="register-error">{errors.fullName}</span>}
                </div>

                <div className="register-field">
                  <label htmlFor="email">Email address</label>
                  <div className={`register-input ${errors.email ? "has-error" : ""}`}>
                    <span className="register-input__icon"><MailIcon /></span>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="name@example.com" value={values.email} onChange={handleChange} />
                  </div>
                  {errors.email && <span className="register-error">{errors.email}</span>}
                </div>

                <div className="register-field">
                  <label htmlFor="password">Password</label>
                  <div className={`register-input ${errors.password ? "has-error" : ""}`}>
                    <span className="register-input__icon"><LockIcon /></span>
                    <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="At least 8 characters" value={values.password} onChange={handleChange} />
                    <button type="button" className="register-input__toggle" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
                      <EyeIcon off={showPassword} />
                    </button>
                  </div>
                  {errors.password && <span className="register-error">{errors.password}</span>}
                </div>

                <div className="register-field">
                  <label htmlFor="confirm">Confirm password</label>
                  <div className={`register-input ${errors.confirm ? "has-error" : ""}`}>
                    <span className="register-input__icon"><LockIcon /></span>
                    <input id="confirm" name="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Re-enter your password" value={values.confirm} onChange={handleChange} />
                    <button type="button" className="register-input__toggle" onClick={() => setShowConfirm((v) => !v)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                      <EyeIcon off={showConfirm} />
                    </button>
                  </div>
                  {errors.confirm && <span className="register-error">{errors.confirm}</span>}
                </div>

                <div className="register-field">
                  <label className="register-check">
                    <input type="checkbox" name="terms" checked={values.terms} onChange={handleChange} />
                    <span>I agree to the <a href="/terms">Terms of use</a> and <a href="/privacy">Privacy policy</a></span>
                  </label>
                  {errors.terms && <span className="register-error">{errors.terms}</span>}
                </div>

                <button type="submit" className="register-btn">Create account</button>
              </form>

              <p className="register-footer">
                Already have an account? <a href="/">Sign in</a>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Register;