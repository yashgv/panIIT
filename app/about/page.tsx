// app/about/page.tsx
export default function AboutPage() {
    return (
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '2rem', 
        borderRadius: '8px', 
        fontFamily: 'Arial, sans-serif', 
        color: '#333', 
        textAlign: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#4CAF50' 
        }}>About Us</h1>
        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: '1.8', 
          maxWidth: '600px', 
          margin: '1rem auto', 
          color: '#555' 
        }}>
          Welcome to the About page. Our mission is to reduce your workload by simplifying the posting process, enhancing your reach, and helping you gain more followers and viewers in a creative and efficient way.
        </p>
        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: '1.8', 
          maxWidth: '600px', 
          margin: '1rem auto', 
          color: '#555' 
        }}>
          With our innovative solutions, you can focus on creating amazing content while we handle the rest, ensuring a seamless experience that boosts your presence and engagement like never before.
        </p>
      </div>
    );
  }
  