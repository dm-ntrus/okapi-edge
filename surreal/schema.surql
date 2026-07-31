-- Okapi Edge — SurrealDB schema (SurrealDB 3.x / Cloud)
-- Namespace/database are selected by the SDK connect() options.

OPTION IMPORT;

-- Admins (back-office)
DEFINE TABLE IF NOT EXISTS admin SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS email ON admin TYPE string ASSERT string::is_email($value);
DEFINE FIELD IF NOT EXISTS name ON admin TYPE string;
DEFINE FIELD IF NOT EXISTS password_hash ON admin TYPE string;
DEFINE FIELD IF NOT EXISTS role ON admin TYPE string DEFAULT 'editor'
  ASSERT $value IN ['owner', 'editor', 'viewer'];
DEFINE FIELD IF NOT EXISTS created_at ON admin TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON admin TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS admin_email ON admin FIELDS email UNIQUE;

-- Blog posts (localized)
DEFINE TABLE IF NOT EXISTS post SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS locale ON post TYPE string DEFAULT 'fr' ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS title ON post TYPE string;
DEFINE FIELD IF NOT EXISTS slug ON post TYPE string;
DEFINE FIELD IF NOT EXISTS category ON post TYPE string;
DEFINE FIELD IF NOT EXISTS author ON post TYPE string;
DEFINE FIELD IF NOT EXISTS date_label ON post TYPE string;
DEFINE FIELD IF NOT EXISTS read_time ON post TYPE string;
DEFINE FIELD IF NOT EXISTS excerpt ON post TYPE string;
DEFINE FIELD IF NOT EXISTS content ON post TYPE string;
DEFINE FIELD IF NOT EXISTS image ON post TYPE option<string>;
DEFINE FIELD IF NOT EXISTS tags ON post TYPE array<string> DEFAULT [];
DEFINE FIELD IF NOT EXISTS published ON post TYPE bool DEFAULT false;
DEFINE FIELD IF NOT EXISTS seo_title ON post TYPE option<string>;
DEFINE FIELD IF NOT EXISTS seo_description ON post TYPE option<string>;
DEFINE FIELD IF NOT EXISTS created_at ON post TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON post TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS post_slug_locale ON post FIELDS slug, locale UNIQUE;

-- Jobs (localized)
DEFINE TABLE IF NOT EXISTS job SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS locale ON job TYPE string DEFAULT 'fr' ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS title ON job TYPE string;
DEFINE FIELD IF NOT EXISTS department ON job TYPE string;
DEFINE FIELD IF NOT EXISTS location ON job TYPE string;
DEFINE FIELD IF NOT EXISTS type ON job TYPE string;
DEFINE FIELD IF NOT EXISTS summary ON job TYPE string;
DEFINE FIELD IF NOT EXISTS responsibilities ON job TYPE array<string> DEFAULT [];
DEFINE FIELD IF NOT EXISTS requirements ON job TYPE array<string> DEFAULT [];
DEFINE FIELD IF NOT EXISTS published ON job TYPE bool DEFAULT true;
DEFINE FIELD IF NOT EXISTS created_at ON job TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON job TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS job_title_locale ON job FIELDS title, locale, location;

-- Press releases (localized)
DEFINE TABLE IF NOT EXISTS press SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS locale ON press TYPE string DEFAULT 'fr' ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS title ON press TYPE string;
DEFINE FIELD IF NOT EXISTS date_label ON press TYPE string;
DEFINE FIELD IF NOT EXISTS category ON press TYPE string;
DEFINE FIELD IF NOT EXISTS summary ON press TYPE string;
DEFINE FIELD IF NOT EXISTS download_url ON press TYPE option<string>;
DEFINE FIELD IF NOT EXISTS published ON press TYPE bool DEFAULT true;
DEFINE FIELD IF NOT EXISTS created_at ON press TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON press TYPE datetime DEFAULT time::now();

-- Products (SaaS portfolio, localized)
DEFINE TABLE IF NOT EXISTS product SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS locale ON product TYPE string DEFAULT 'fr' ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS key ON product TYPE string;
DEFINE FIELD IF NOT EXISTS name ON product TYPE string;
DEFINE FIELD IF NOT EXISTS subtitle ON product TYPE string;
DEFINE FIELD IF NOT EXISTS tagline ON product TYPE string;
DEFINE FIELD IF NOT EXISTS category ON product TYPE string;
DEFINE FIELD IF NOT EXISTS description ON product TYPE string;
DEFINE FIELD IF NOT EXISTS full_description ON product TYPE string;
DEFINE FIELD IF NOT EXISTS tags ON product TYPE array<string> DEFAULT [];
DEFINE FIELD IF NOT EXISTS metrics ON product TYPE array<object> DEFAULT [];
DEFINE FIELD IF NOT EXISTS features ON product TYPE array<object> DEFAULT [];
DEFINE FIELD IF NOT EXISTS subdomain_url ON product TYPE string;
DEFINE FIELD IF NOT EXISTS badge ON product TYPE string;
DEFINE FIELD IF NOT EXISTS color ON product TYPE string;
DEFINE FIELD IF NOT EXISTS bg_gradient ON product TYPE string;
DEFINE FIELD IF NOT EXISTS published ON product TYPE bool DEFAULT true;
DEFINE FIELD IF NOT EXISTS sort_order ON product TYPE number DEFAULT 0;
DEFINE FIELD IF NOT EXISTS created_at ON product TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON product TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS product_key_locale ON product FIELDS key, locale UNIQUE;

-- Contact / B2B inquiries
DEFINE TABLE IF NOT EXISTS inquiry SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS kind ON inquiry TYPE string DEFAULT 'b2b'
  ASSERT $value IN ['b2b', 'investor', 'newsletter', 'career', 'contact'];
DEFINE FIELD IF NOT EXISTS locale ON inquiry TYPE option<string>;
DEFINE FIELD IF NOT EXISTS full_name ON inquiry TYPE string;
DEFINE FIELD IF NOT EXISTS organization ON inquiry TYPE option<string>;
DEFINE FIELD IF NOT EXISTS email ON inquiry TYPE string;
DEFINE FIELD IF NOT EXISTS phone ON inquiry TYPE option<string>;
DEFINE FIELD IF NOT EXISTS interest ON inquiry TYPE option<string>;
DEFINE FIELD IF NOT EXISTS message ON inquiry TYPE option<string>;
DEFINE FIELD IF NOT EXISTS meta ON inquiry TYPE object DEFAULT {};
DEFINE FIELD IF NOT EXISTS status ON inquiry TYPE string DEFAULT 'new'
  ASSERT $value IN ['new', 'in_progress', 'closed'];
DEFINE FIELD IF NOT EXISTS created_at ON inquiry TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON inquiry TYPE datetime DEFAULT time::now();

-- Newsletter subscribers (CRM)
DEFINE TABLE IF NOT EXISTS newsletter_subscriber SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS email ON newsletter_subscriber TYPE string;
DEFINE FIELD IF NOT EXISTS full_name ON newsletter_subscriber TYPE option<string>;
DEFINE FIELD IF NOT EXISTS locale ON newsletter_subscriber TYPE string DEFAULT 'fr'
  ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS status ON newsletter_subscriber TYPE string DEFAULT 'pending'
  ASSERT $value IN ['pending', 'active', 'unsubscribed', 'bounced'];
DEFINE FIELD IF NOT EXISTS source ON newsletter_subscriber TYPE string DEFAULT 'footer'
  ASSERT $value IN ['footer', 'admin', 'import', 'migration'];
DEFINE FIELD IF NOT EXISTS tags ON newsletter_subscriber TYPE array<string> DEFAULT [];
DEFINE FIELD IF NOT EXISTS confirm_token ON newsletter_subscriber TYPE string;
DEFINE FIELD IF NOT EXISTS unsubscribe_token ON newsletter_subscriber TYPE string;
DEFINE FIELD IF NOT EXISTS confirmed_at ON newsletter_subscriber TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS unsubscribed_at ON newsletter_subscriber TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS created_at ON newsletter_subscriber TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON newsletter_subscriber TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS newsletter_subscriber_email ON newsletter_subscriber FIELDS email UNIQUE;
DEFINE INDEX IF NOT EXISTS newsletter_subscriber_confirm ON newsletter_subscriber FIELDS confirm_token UNIQUE;
DEFINE INDEX IF NOT EXISTS newsletter_subscriber_unsub ON newsletter_subscriber FIELDS unsubscribe_token UNIQUE;

-- Newsletter campaigns
DEFINE TABLE IF NOT EXISTS newsletter_campaign SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS locale ON newsletter_campaign TYPE string DEFAULT 'fr'
  ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS subject ON newsletter_campaign TYPE string;
DEFINE FIELD IF NOT EXISTS preheader ON newsletter_campaign TYPE option<string>;
DEFINE FIELD IF NOT EXISTS html_body ON newsletter_campaign TYPE string;
DEFINE FIELD IF NOT EXISTS status ON newsletter_campaign TYPE string DEFAULT 'draft'
  ASSERT $value IN ['draft', 'scheduled', 'sending', 'sent', 'cancelled'];
DEFINE FIELD IF NOT EXISTS audience ON newsletter_campaign TYPE string DEFAULT 'all_active'
  ASSERT $value IN ['all_active', 'locale', 'tags'];
DEFINE FIELD IF NOT EXISTS audience_locale ON newsletter_campaign TYPE option<string>;
DEFINE FIELD IF NOT EXISTS audience_tags ON newsletter_campaign TYPE array<string> DEFAULT [];
DEFINE FIELD IF NOT EXISTS scheduled_at ON newsletter_campaign TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS sent_at ON newsletter_campaign TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS stats ON newsletter_campaign TYPE object DEFAULT {
    recipients: 0,
    sent: 0,
    failed: 0
  };
DEFINE FIELD IF NOT EXISTS created_by ON newsletter_campaign TYPE option<string>;
DEFINE FIELD IF NOT EXISTS created_at ON newsletter_campaign TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON newsletter_campaign TYPE datetime DEFAULT time::now();

-- Per-recipient delivery log
DEFINE TABLE IF NOT EXISTS newsletter_delivery SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS campaign ON newsletter_delivery TYPE record<newsletter_campaign>;
DEFINE FIELD IF NOT EXISTS subscriber ON newsletter_delivery TYPE record<newsletter_subscriber>;
DEFINE FIELD IF NOT EXISTS email ON newsletter_delivery TYPE string;
DEFINE FIELD IF NOT EXISTS status ON newsletter_delivery TYPE string DEFAULT 'queued'
  ASSERT $value IN ['queued', 'sent', 'failed', 'bounced'];
DEFINE FIELD IF NOT EXISTS provider_id ON newsletter_delivery TYPE option<string>;
DEFINE FIELD IF NOT EXISTS error ON newsletter_delivery TYPE option<string>;
DEFINE FIELD IF NOT EXISTS sent_at ON newsletter_delivery TYPE option<datetime>;
DEFINE FIELD IF NOT EXISTS created_at ON newsletter_delivery TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS newsletter_delivery_campaign ON newsletter_delivery FIELDS campaign;

-- Site settings (key/value JSON)
DEFINE TABLE IF NOT EXISTS setting SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS key ON setting TYPE string;
DEFINE FIELD IF NOT EXISTS value ON setting TYPE object;
DEFINE FIELD IF NOT EXISTS updated_at ON setting TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS setting_key ON setting FIELDS key UNIQUE;

-- Leadership / team (localized)
DEFINE TABLE IF NOT EXISTS team SCHEMAFULL;
DEFINE FIELD IF NOT EXISTS locale ON team TYPE string DEFAULT 'fr' ASSERT $value IN ['fr', 'en'];
DEFINE FIELD IF NOT EXISTS key ON team TYPE string;
DEFINE FIELD IF NOT EXISTS name ON team TYPE string;
DEFINE FIELD IF NOT EXISTS role ON team TYPE string;
DEFINE FIELD IF NOT EXISTS bio ON team TYPE string;
DEFINE FIELD IF NOT EXISTS image ON team TYPE option<string>;
DEFINE FIELD IF NOT EXISTS linkedin ON team TYPE option<string>;
DEFINE FIELD IF NOT EXISTS twitter ON team TYPE option<string>;
DEFINE FIELD IF NOT EXISTS sort_order ON team TYPE number DEFAULT 0;
DEFINE FIELD IF NOT EXISTS published ON team TYPE bool DEFAULT true;
DEFINE FIELD IF NOT EXISTS created_at ON team TYPE datetime DEFAULT time::now();
DEFINE FIELD IF NOT EXISTS updated_at ON team TYPE datetime DEFAULT time::now();
DEFINE INDEX IF NOT EXISTS team_key_locale ON team FIELDS key, locale UNIQUE;
