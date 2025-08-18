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
    thanks: isNorwegian ? 'Takk for din henvendelse!' : 'Thanks for your request!',
    getBack: isNorwegian ? 'Vi tar kontakt med deg så snart som mulig.' : "We'll get back to you shortly.",
    summaryTitle: isNorwegian ? 'ORDREOPPSUMMERING' : 'ORDER SUMMARY',
    planLabel: isNorwegian ? 'Plan' : 'Plan',
    includedLabel: isNorwegian ? 'Inkludert' : 'Included',
    addonsLabel: isNorwegian ? 'TILLEGGSTJENESTER' : 'ADD-ONS',
    totalLabel: isNorwegian ? 'Estimert total' : 'Estimated Total',
    companyInfo: isNorwegian ? 'Syntax Studio | Org.nr: 932 933 352 | E-post: info@syntaxstudio.no' : 'Syntax Studio | Org.no: 932 933 352 | Email: info@syntaxstudio.no',
  };

  // --- STYLES ---
  const bodyStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px 0',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    padding: '30px 0',
    textAlign: 'center',
    borderRadius: '12px',
  };
  
  const mainStyle: React.CSSProperties = {
    padding: '40px',
  };

  const h1Style: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 10px',
  };

  const pStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: 1.5,
    margin: 0,
  };
  
  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    margin: '0 0 12px',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  };

  const hrStyle: React.CSSProperties = {
    border: 0,
    borderTop: '1px solid #e5e7eb',
    margin: '32px 0',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  
  const rowStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#374151',
  };

  const labelCellStyle: React.CSSProperties = {
    padding: '8px 0',
    textAlign: 'left',
  };

  const valueCellStyle: React.CSSProperties = {
    ...labelCellStyle,
    textAlign: 'right',
    fontWeight: 500,
    textTransform: 'capitalize',
  };
  
  const totalLabelStyle: React.CSSProperties = {
    ...labelCellStyle,
    fontSize: '18px',
    fontWeight: 'bold',
    paddingTop: '20px',
  };
  
  const totalValueStyle: React.CSSProperties = {
    ...valueCellStyle,
    fontSize: '18px',
    fontWeight: 'bold',
    paddingTop: '20px',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9ca3af',
    padding: '20px 40px',
    borderTop: '1px solid #e5e7eb',
  };


  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <table
            role="presentation"
            cellPadding="0"
            cellSpacing="0"
            style={{ border: '0', display: 'inline-block' }}
          >
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'middle', paddingRight: '15px' }}>
                  <img
                    src="https://www.syntaxstudio.no/logos/syntax-i.webp"
                    alt="Syntax Studio Icon"
                    width="60"
                    style={{ display: 'block' }}
                  />
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>
                  <p style={{ color: '#ffffff', fontSize: '28px', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>
                    syntax
                  </p>
                  <p style={{ color: '#ffffff', fontSize: '28px', fontWeight: '300', margin: 0, lineHeight: 1 }}>
                    studio
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </header>

        <main style={mainStyle}>
          <h1 style={h1Style}>{translations.thanks}</h1>
          <p style={pStyle}>{translations.getBack}</p>

          <hr style={hrStyle} />
          
          <h2 style={sectionHeadingStyle}>{translations.summaryTitle}</h2>
          <table style={tableStyle}>
            <tbody>
              <tr style={rowStyle}>
                <td style={labelCellStyle}>{translations.planLabel}</td>
                <td style={valueCellStyle}>{plan}</td>
              </tr>
              {included && (
                <tr style={rowStyle}>
                  <td style={labelCellStyle}>{translations.includedLabel}</td>
                  <td style={valueCellStyle}>{included.split(': ')[1]}</td>
                </tr>
              )}
            </tbody>
          </table>

          {addons.length > 0 && (
            <>
              <hr style={hrStyle} />
              <h2 style={sectionHeadingStyle}>{translations.addonsLabel}</h2>
              <table style={tableStyle}>
                <tbody>
                  {addons.map((addon, index) => (
                    <tr key={index} style={rowStyle}>
                      <td style={labelCellStyle}>{addon.label}</td>
                      <td style={valueCellStyle}>{addon.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <hr style={{...hrStyle, borderTop: '2px solid #d1d5db'}} />

          <table style={tableStyle}>
            <tbody>
              <tr>
                <td style={totalLabelStyle}>{translations.totalLabel}</td>
                <td style={totalValueStyle}>{total}</td>
              </tr>
            </tbody>
          </table>
        </main>

        <footer style={footerStyle}>
          <p style={{ margin: 0 }}>{translations.companyInfo}</p>
        </footer>
      </div>
    </div>
  );
};

export default OrderConfirmationEmail;
