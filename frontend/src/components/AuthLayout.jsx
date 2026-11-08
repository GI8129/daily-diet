import { IconLeaf } from './Icons.jsx'

// Estrutura das telas de login e cadastro: painel de destaque + formulário
export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <aside className="auth-hero">
        <div className="auth-hero-content">
          <span className="brand-logo big">
            <IconLeaf width={30} height={30} />
          </span>
          <h1>Daily Diet</h1>
          <p>Registre suas refeições, acompanhe sua dieta e veja sua evolução dia após dia.</p>
          <ul className="hero-list">
            <li>Registre cada refeição</li>
            <li>Saiba se está dentro da dieta</li>
            <li>Acompanhe sua melhor sequência</li>
          </ul>
        </div>
      </aside>

      <div className="auth-form-side">{children}</div>
    </div>
  )
}
