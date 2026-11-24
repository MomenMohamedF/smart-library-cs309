import { useState } from "react";
import "./Home.css";

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Browse books", href: "/books" },
  { label: "My borrowings", href: "/borrowings" },
  { label: "Favorites", href: "/favorites" },
];

const CATEGORIES = ["All", "Fiction", "Science", "History", "Technology", "Self-growth", "Children"];

const BOOKS = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", category: "Fiction", available: true, tone: "navy" },
  { id: 2, title: "Cosmos", author: "Carl Sagan", category: "Science", available: true, tone: "gold" },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "History", available: false, tone: "clay" },
  { id: 4, title: "Clean Code", author: "Robert C. Martin", category: "Technology", available: true, tone: "slate" },
  { id: 5, title: "Atomic Habits", author: "James Clear", category: "Self-growth", available: true, tone: "sand" },
  { id: 6, title: "The Little Prince", author: "Antoine de Saint-Exupéry", category: "Children", available: true, tone: "navy" },
  { id: 7, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", available: false, tone: "slate" },
  { id: 8, title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", available: true, tone: "clay" },
];

const STEPS = [
  { title: "Find a book", text: "Search by title, author, or topic, or browse by category." },
  { title: "Borrow in one click", text: "Reserve an available copy and pick it up when it suits you." },
  { title: "Return and rediscover", text: "Return on time and get new recommendations based on what you read." },
];

const STATS = [
  { value: "12,400+", label: "Books in the catalog" },
  { value: "3,200", label: "Active readers" },
  { value: "14 days", label: "Standard loan period" },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6.5C10.3 5.2 7.8 4.6 4 4.8v13c3.8-.2 6.3.4 8 1.7 1.7-1.3 4.2-1.9 8-1.7v-13c-3.8-.2-6.3.4-8 1.7Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleBooks = BOOKS.filter((book) => {
    const matchesCategory = category === "All" || book.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">
      {/* Navbar */}
      <header className="home-nav">
        <div className="home-container home-nav__inner">
          <a href="/home" className="home-logo">
            <span className="home-logo__mark"><BookIcon /></span>
            <span className="home-logo__text">smart<span>library</span></span>
          </a>

          <button
            className="home-nav__toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <nav className={`home-nav__links ${menuOpen ? "is-open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={link.href === "/home" ? "is-active" : ""}>
                {link.label}
              </a>
            ))}
            <a href="/profile" className="home-btn home-btn--primary home-nav__cta">My account</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="home-hero">
          <div className="home-container home-hero__inner">
            <div className="home-hero__content">
              <p className="home-eyebrow">Welcome back</p>
              <h1 className="home-hero__title">
                What will you read <em>next?</em>
              </h1>
              <p className="home-hero__text">
                Search the catalog, borrow in a few clicks, and keep track of every book you love.
              </p>

              <form className="home-search" onSubmit={handleSearch} role="search">
                <span className="home-search__icon"><SearchIcon /></span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title or author"
                  aria-label="Search books"
                />
                <button type="submit" className="home-btn home-btn--primary">Search</button>
              </form>
            </div>

            <div className="home-shelf" aria-hidden="true">
              <div className="home-shelf__books">
                <span className="spine spine--gold h1" />
                <span className="spine spine--clay h2" />
                <span className="spine spine--slate h3" />
                <span className="spine spine--sand h4" />
                <span className="spine spine--gold h2" />
                <span className="spine spine--clay h1" />
                <span className="spine spine--slate h4" />
                <span className="spine spine--sand h3" />
              </div>
              <div className="home-shelf__board" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="home-container home-stats">
          {STATS.map((s) => (
            <div key={s.label} className="home-stats__item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* Popular books */}
        <section id="popular" className="home-section home-container">
          <div className="home-section__head">
            <h2 className="home-section__title">Popular <em>this month</em></h2>
            <a href="/books" className="home-link">See all books</a>
          </div>

          <div className="home-chips" role="tablist" aria-label="Book categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={`home-chip ${category === c ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {visibleBooks.length === 0 ? (
            <div className="home-empty">
              <p>No books match your search.</p>
              <button
                className="home-btn home-btn--ghost"
                onClick={() => { setQuery(""); setCategory("All"); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="home-grid">
              {visibleBooks.map((book) => (
                <article key={book.id} className="home-card">
                  <div className={`home-cover home-cover--${book.tone}`}>
                    <span className="home-cover__title">{book.title}</span>
                    <span className="home-cover__author">{book.author}</span>
                  </div>
                  <div className="home-card__body">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <div className="home-card__foot">
                      <span className={`home-status ${book.available ? "is-available" : "is-out"}`}>
                        {book.available ? "Available" : "Checked out"}
                      </span>
                      <a href={`/books/${book.id}`} className="home-link">View details</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="home-how">
          <div className="home-container">
            <h2 className="home-section__title home-how__title">
              Borrowing made <em>simple</em>
            </h2>
            <ol className="home-steps">
              {STEPS.map((step, i) => (
                <li key={step.title} className="home-step">
                  <span className="home-step__num">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="home-container home-cta">
          <div className="home-cta__box">
            <h2>Can't find the book you need?</h2>
            <p>Send us a request and we'll try to add it to the library.</p>
            <a href="/requests/new" className="home-btn home-btn--gold">Request a book</a>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-container home-footer__inner">
          <span>© {new Date().getFullYear()} Smart Library</span>
          <nav>
            <a href="/about">About</a>
            <a href="/help">Help</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Home;
