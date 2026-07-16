import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="not-found marble-surface">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="script-heading">This suite is not on the directory</h1>
        <p>The page you requested may have moved or no longer exists.</p>
        <Link className="button button--dark" to="/">Return Home</Link>
      </div>
    </section>
  )
}
