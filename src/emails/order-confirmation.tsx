
import React from 'react';

interface OrderConfirmationEmailProps {
  plan: string;
  included: string | null;
  addons: { label: string; price: string }[];
  total: string;
  locale: string;
}

const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  plan,
  included,
  addons,
  total,
  locale,
}) => {
  const isNorwegian = locale.startsWith('no');
  const translations = {
    thanks: isNorwegian ? 'Takk for forespørselen!' : 'Thanks for your request!',
    getBack: isNorwegian ? 'Vi kommer tilbake til deg så raskt vi kan.' : 'We’ll get back to you shortly.',
    planLabel: isNorwegian ? 'Plan' : 'Plan',
    includedLabel: isNorwegian ? 'Inkludert' : 'Included',
    addonsLabel: isNorwegian ? 'Tilleggstjenester' : 'Add-ons',
    totalLabel: isNorwegian ? 'Estimert total' : 'Estimated total',
    companyInfo: isNorwegian ? 'Syntax Studio | Org.nr: 932 933 352 | E-post: info@syntaxstudio.no' : 'Syntax Studio | Org.no: 932 933 352 | Email: info@syntaxstudio.no',
  };

  const containerStyle: React.CSSProperties = {
    fontFamily: 'sans-serif',
    color: '#333',
    backgroundColor: '#f5f5f5',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '600px',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#000',
    padding: '40px',
    textAlign: 'center',
  };

  const mainStyle: React.CSSProperties = {
    padding: '40px',
    backgroundColor: '#fff',
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: '#000',
    padding: '20px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#fff',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    width: '30%',
  };

  const tdStyle: React.CSSProperties = {
    textAlign: 'right',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <img src="https://www.syntaxstudio.no/_next/image?url=%2Flogosyntax-nbnm.png&w=256&q=75" alt="Syntax Studio" style={{ maxWidth: '200px' }} />
      </header>
      <main style={mainStyle}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{translations.thanks}</h1>
        <p style={{ marginBottom: '30px' }}>{translations.getBack}</p>
        
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={thStyle}>{translations.planLabel}:</th>
              <td style={tdStyle}>{plan}</td>
            </tr>
            {included && (
              <tr>
                <th style={thStyle}>{translations.includedLabel}:</th>
                <td style={tdStyle}>{included}</td>
              </tr>
            )}
          </tbody>
        </table>

        {addons.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{translations.addonsLabel}:</h2>
            <table style={tableStyle}>
              <tbody>
                {addons.map((addon, index) => (
                  <tr key={index}>
                    <td style={{...tdStyle, textAlign: 'left', paddingLeft: '20px'}}>{addon.label}</td>
                    <td style={tdStyle}>{addon.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <table style={{...tableStyle, marginTop: '30px' }}>
          <tbody>
            <tr>
              <th style={{...thStyle, fontSize: '18px' }}>{translations.totalLabel}:</th>
              <td style={{...tdStyle, fontSize: '18px', fontWeight: 'bold' }}>{total}</td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer style={footerStyle}>
        <p>{translations.companyInfo}</p>
      </footer>
    </div>
  );
};

export default OrderConfirmationEmail;
