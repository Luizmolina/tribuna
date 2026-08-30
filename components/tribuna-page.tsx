'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Menu, Search, Send, X } from 'lucide-react'

type Article = {
  category: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  featured?: boolean
}

const articles: Article[] = [
  {
    category: 'Trabalho',
    title: 'A greve como escola de autonomia',
    excerpt: 'Organizar a força coletiva é mais do que interromper a produção: é ensaiar, no presente, a sociedade que queremos construir.',
    author: 'Lia Monteiro',
    date: '28 ago. 2026',
    readTime: '8 min',
    featured: true,
  },
  {
    category: 'Crítica',
    title: 'Contra a política de gabinete',
    excerpt: 'Quando a decisão se distancia de quem vive o problema, a representação vira apenas mais uma forma de controle.',
    author: 'Caio Reis',
    date: '25 ago. 2026',
    readTime: '6 min',
  },
  {
    category: 'Território',
    title: 'O bairro que aprendeu a se governar',
    excerpt: 'Notas sobre solidariedade prática, assembleias de rua e os pequenos acordos que sustentam uma comunidade.',
    author: 'Joana Alves',
    date: '19 ago. 2026',
    readTime: '10 min',
  },
  {
    category: 'História',
    title: 'A tradição que não pede licença',
    excerpt: 'Uma leitura atual do sindicalismo revolucionário e das lutas que recusaram esperar pelo futuro.',
    author: 'Rafael Nunes',
    date: '12 ago. 2026',
    readTime: '12 min',
  },
]

const categories = ['Todos', 'Trabalho', 'Crítica', 'Território', 'História']

export function TribunaPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filteredArticles = useMemo(() => {
    const normalized = query.toLowerCase()
    return articles.filter((article) => {
      const matchesCategory = activeCategory === 'Todos' || article.category === activeCategory
      const matchesQuery = !normalized || `${article.title} ${article.excerpt} ${article.author}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-border py-5">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Tribuna, início">
            <span className="flex size-9 items-center justify-center bg-primary text-primary-foreground font-black text-xl leading-none">T</span>
            <span className="font-mono text-sm font-bold uppercase tracking-[0.18em]">Tribuna</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            <a className="text-sm font-medium hover:text-primary" href="#textos">Textos</a>
            <a className="text-sm font-medium hover:text-primary" href="#manifesto">Manifesto</a>
            <button className="bg-primary px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5" onClick={() => setIsSubmitOpen(true)}>Enviar texto</button>
          </nav>
          <button className="bg-primary px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground md:hidden" onClick={() => setIsSubmitOpen(true)}>Enviar texto</button>
        </header>

        <section id="inicio" className="grid gap-10 border-b border-border py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-24">
          <div>
            <p className="mb-7 font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">Uma publicação independente</p>
            <h1 className="max-w-4xl text-balance font-serif text-5xl font-black uppercase leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">A palavra é uma ferramenta de luta.</h1>
          </div>
          <div className="max-w-sm border-l-2 border-primary pl-5 md:mb-2">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">Análises, relatos e pensamento crítico para quem não aceita o mundo como está.</p>
            <a href="#textos" className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-primary hover:gap-3">Ler os textos <ArrowRight data-icon="inline-end" /></a>
          </div>
        </section>

        <section id="textos" className="py-12 md:py-16">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">Arquivo vivo</p><h2 className="mt-2 font-serif text-4xl font-black uppercase tracking-tight">Últimas vozes</h2></div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative"><label className="sr-only" htmlFor="search">Buscar textos</label><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} /><input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar no arquivo" className="h-10 w-full border border-border bg-card pl-9 pr-3 font-mono text-xs outline-none placeholder:text-muted-foreground focus:border-primary sm:w-56" /></div>
              <div className="flex flex-wrap gap-2" aria-label="Filtrar por categoria">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary hover:text-foreground'}`}>{category}</button>)}</div>
            </div>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-2">{filteredArticles.map((article) => <article key={article.title} className={`group flex min-h-72 flex-col justify-between bg-background p-6 md:p-8 ${article.featured ? 'md:col-span-2 md:min-h-80' : ''}`}><div><div className="mb-8 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest"><span className="text-primary">{article.category}</span><span className="text-muted-foreground">{article.readTime} de leitura</span></div><h3 className={`max-w-3xl font-serif text-3xl font-black uppercase leading-tight tracking-tight transition-colors group-hover:text-primary ${article.featured ? 'md:text-5xl' : ''}`}>{article.title}</h3><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p></div><div className="mt-10 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-wider"><span>{article.author}</span><time>{article.date}</time></div></article>)}</div>
          {filteredArticles.length === 0 && <p className="border border-border p-10 text-center font-mono text-sm text-muted-foreground">Nenhum texto encontrado.</p>}
        </section>

        <section id="manifesto" className="grid gap-8 border-t border-border py-16 md:grid-cols-[0.7fr_1.3fr] md:py-24"><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">Por que existimos</p><div><p className="max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-5xl">“Nenhuma mudança real nasce do silêncio. A Tribuna abre espaço para o pensamento que se organiza e para a palavra que toma partido.”</p><p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">Somos uma publicação aberta a análises independentes sobre trabalho, política e vida coletiva. Não buscamos neutralidade: buscamos honestidade, conflito de ideias e autonomia.</p></div></section>

        <footer className="flex flex-col gap-5 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between"><span className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Tribuna — 2026</span><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Pensar. Organizar. Transformar.</span></footer>
      </div>

      {isSubmitOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-5" role="dialog" aria-modal="true" aria-labelledby="submit-title"><div className="w-full max-w-lg bg-background p-6 shadow-2xl sm:p-8"><div className="mb-8 flex items-start justify-between"><div><p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Espaço aberto</p><h2 id="submit-title" className="mt-2 font-serif text-3xl font-black uppercase">Enviar um texto</h2></div><button onClick={() => { setIsSubmitOpen(false); setSubmitted(false) }} aria-label="Fechar formulário"><X /></button></div>{submitted ? <div className="border border-primary p-6"><Check className="mb-4 text-primary" /><p className="font-serif text-xl font-bold">Recebemos sua proposta.</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">O texto será lido pela equipe editorial antes de ser publicado.</p></div> : <form onSubmit={handleSubmit} className="flex flex-col gap-4"><label className="flex flex-col gap-2 font-mono text-[10px] font-bold uppercase tracking-wider">Seu nome<input required className="border border-border bg-card p-3 font-sans text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" /></label><label className="flex flex-col gap-2 font-mono text-[10px] font-bold uppercase tracking-wider">Título<input required className="border border-border bg-card p-3 font-sans text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" /></label><label className="flex flex-col gap-2 font-mono text-[10px] font-bold uppercase tracking-wider">Texto<textarea required rows={6} className="resize-y border border-border bg-card p-3 font-sans text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" /></label><button className="mt-2 inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90">Enviar para avaliação <Send data-icon="inline-end" /></button></form>}</div></div>}
    </main>
  )
}
