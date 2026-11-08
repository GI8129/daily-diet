import { useState } from 'react'
import { toInputValue } from '../utils/date.js'

export default function MealForm({ initialValues, onSubmit, submitLabel, loading, error }) {
  const [form, setForm] = useState(() => ({
    name: initialValues?.name ?? '',
    description: initialValues?.description ?? '',
    eatenAt: toInputValue(initialValues?.eatenAt ?? new Date().toISOString()),
    isOnDiet: initialValues?.isOnDiet ?? true,
  }))

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      name: form.name,
      description: form.description,
      eatenAt: new Date(form.eatenAt).toISOString(),
      isOnDiet: form.isOnDiet,
    })
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="eatenAt">Data e hora</label>
        <input
          id="eatenAt"
          name="eatenAt"
          type="datetime-local"
          value={form.eatenAt}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <span className="label">Está dentro da dieta?</span>
        <div className="radio-row">
          <label className="radio in">
            <input
              type="radio"
              name="isOnDiet"
              checked={form.isOnDiet === true}
              onChange={() => setForm((prev) => ({ ...prev, isOnDiet: true }))}
            />
            Sim
          </label>
          <label className="radio out">
            <input
              type="radio"
              name="isOnDiet"
              checked={form.isOnDiet === false}
              onChange={() => setForm((prev) => ({ ...prev, isOnDiet: false }))}
            />
            Não
          </label>
        </div>
      </div>

      {error && <p className="alert alert-error">{error}</p>}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Salvando...' : submitLabel}
      </button>
    </form>
  )
}
