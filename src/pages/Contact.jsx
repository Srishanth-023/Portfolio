import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";
import { personalInfo, socialLinks } from "../constants";
import { sendMessage } from "../lib/sendMessage";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", botcheck: false });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
      setIsConfigured(false);
      if (import.meta.env.DEV) {
        console.warn("Web3Forms access key is missing. Contact form is disabled.");
      }
    }
  }, []);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || !isConfigured) return;

    // Client-side rate limiting
    const lastSent = localStorage.getItem("lastMessageSent");
    if (lastSent && Date.now() - parseInt(lastSent, 10) < 60000) {
      showAlert({ show: true, text: "Please wait a minute before sending another message.", type: "danger" });
      return;
    }

    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      showAlert({ show: true, text: "Please fill in all required fields.", type: "danger" });
      return;
    }

    setLoading(true);
    setCurrentAnimation("hit");

    try {
      await sendMessage({
        name: name.trim(),
        email: email.trim(),
        subject: form.subject.trim(),
        message: message.trim(),
        botcheck: form.botcheck
      });

      localStorage.setItem("lastMessageSent", Date.now().toString());
      setLoading(false);
      
      showAlert({
        show: true,
        text: "Thank you for your message!",
        type: "success",
      });

      setTimeout(() => {
        hideAlert(false);
        setCurrentAnimation("idle");
        setForm({ name: "", email: "", subject: "", message: "", botcheck: false });
      }, 3000);

    } catch (error) {
      setLoading(false);
      console.error("Web3Forms Error:", error);
      setCurrentAnimation("idle");

      showAlert({
        show: true,
        text: error.message || "I didn't receive your message. Please try again.",
        type: "danger",
      });
    }
  };

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <p className="text-slate-500 mt-3 max-w-sm">
          Feel free to reach out for collaborations, opportunities, or just to say hi!
        </p>

        <div className="flex gap-4 mt-5">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.link} target="_blank" rel="noreferrer" className="w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-md">
              <img src={link.iconUrl} alt={link.name} className="w-1/2 h-1/2 object-contain" />
            </a>
          ))}
        </div>

        {!isConfigured ? (
          <div className="mt-14 p-6 bg-red-50 text-red-800 rounded-lg border border-red-200">
            <h3 className="font-semibold text-lg mb-2">Form currently disabled</h3>
            <p>
              The contact form is not configured yet. Please email me directly at{" "}
              <a href={`mailto:${personalInfo.contactEmail}`} className="font-bold underline">
                {personalInfo.contactEmail}
              </a>
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='w-full flex flex-col gap-7 mt-10'
          >
            {/* Honeypot Field */}
            <input 
              type="checkbox" 
              name="botcheck" 
              className="hidden" 
              style={{ display: 'none' }} 
              tabIndex={-1} 
              autoComplete="off"
              checked={form.botcheck}
              onChange={handleChange}
            />

            <label className='text-black-500 font-semibold' htmlFor="name">
              Name <span className="text-red-500">*</span>
              <input
                id="name"
                type='text'
                name='name'
                className='input'
                placeholder='John Doe'
                required
                maxLength={80}
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-required="true"
              />
            </label>

            <label className='text-black-500 font-semibold' htmlFor="email">
              Email <span className="text-red-500">*</span>
              <input
                id="email"
                type='email'
                name='email'
                className='input'
                placeholder='john@example.com'
                required
                maxLength={120}
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-required="true"
              />
            </label>

            <label className='text-black-500 font-semibold' htmlFor="subject">
              Subject
              <input
                id="subject"
                type='text'
                name='subject'
                className='input'
                placeholder='How can I help you?'
                maxLength={120}
                value={form.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className='text-black-500 font-semibold relative' htmlFor="message">
              Your Message <span className="text-red-500">*</span>
              <textarea
                id="message"
                name='message'
                rows='4'
                className='textarea'
                placeholder='Write your thoughts here...'
                required
                maxLength={2000}
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                aria-required="true"
              />
              <span className="absolute bottom-2 right-3 text-xs text-slate-400">
                {form.message.length}/2000
              </span>
            </label>

            <button
              type='submit'
              disabled={loading}
              className='btn'
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-live="polite"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          dpr={[1, 2]}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={null}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
