# Regulatory Taxonomy

This taxonomy keeps filters, seed records, map layers, and product language consistent. Add new labels only when an existing label cannot accurately describe the record.

## Topics

Preferred topic labels:

- Climate disclosure
- Climate transition planning
- GHG emissions
- Sustainable finance
- Taxonomy and classification
- Supply chain due diligence
- Human rights
- Biodiversity and nature
- Deforestation
- Circular economy
- Product sustainability
- Green claims
- Water
- Waste and pollution
- Governance
- Assurance
- Financial risk

## Sectors

Preferred sector labels:

- All sectors
- Financial services
- Asset management
- Banking
- Insurance
- Private equity
- Real estate
- Agriculture
- Food and beverage
- Manufacturing
- Energy
- Transport
- Construction
- Chemicals
- Mining
- Waste
- Packaging
- Retail
- Consumer goods
- Automotive
- Technology
- Public sector
- Textiles
- Listed companies

## Value Chain Coverage

Preferred value chain labels:

- Own operations
- Upstream suppliers
- Downstream customers
- Products and services
- Investment portfolio
- Financed emissions
- Trade and imports
- Products and materials
- Customer claims and labels
- Land use and nature
- Board and executive oversight

Avoid duplicate variants such as "portfolio companies and investments" unless a controlled taxonomy migration is planned.

## Company Types

Preferred company type labels:

- Corporate
- Listed company
- Large private company
- SME
- Financial institution
- Asset manager
- Private equity fund
- Bank
- Insurer
- Non EU parent
- Supplier
- Exporter
- Portfolio company

## Business Functions

Preferred business function labels:

- Sustainability
- Finance
- Legal
- Compliance
- Procurement
- Risk
- Internal audit
- Investor relations
- Operations
- Product
- Supply chain
- Board

## Obligation Types

Preferred obligation labels:

- Reporting obligation
- Governance obligation
- Due diligence obligation
- Financial disclosure obligation
- Product compliance obligation
- Supply chain obligation
- Assurance obligation
- Transition plan obligation
- Data collection obligation
- Board oversight obligation
- Taxonomy disclosure obligation

In code, these may map to boolean fields such as `reporting`, `governance`, `dueDiligence`, `assurance`, `transitionPlan`, `taxonomyDisclosure`, `productCompliance`, `supplierDataCollection`, `boardOversight`, and `financialDisclosure`.

## Jurisdiction Types

Preferred jurisdiction type labels:

- Local
- National
- Regional
- Supranational
- International

## Legal Instrument Types

Preferred legal instrument labels:

- Law
- Directive
- Regulation
- Standard
- Guidance
- Consultation
- Voluntary framework

## Status Labels

Preferred status labels:

- Consultation
- Adopted
- In force
- First reporting
- Transition
- Paused
- Voluntary

Do not use status as a proxy for regulatory intensity. A jurisdiction can have high intensity because of multiple active obligations even if one record is transitional.

## Regulatory Intensity

Preferred intensity labels:

- No tracked data
- Low
- Medium
- High
- Very high

Recommended map use:

- Country fill or record-density color = regulatory intensity
- Badge, border, or icon = selected view status or relevance

## Confidence Levels

Preferred confidence labels:

- High
- Medium
- Low

Confidence is about source and review reliability, not whether the regulation is important.

## Data Quality Status

Preferred data quality labels:

- Verified
- Needs review
- Source missing
- Date uncertain
- Seed data

## Advisory Opportunities

Preferred advisory opportunity labels:

- Gap assessment
- Double materiality assessment
- ESG data model design
- Reporting readiness
- Internal controls
- Scope 1, 2 and 3 emissions inventory
- Supplier due diligence
- Taxonomy eligibility and alignment assessment
- SFDR fund classification support
- Climate transition plan
- Board training
- Assurance preparation
- ESG software implementation
- ESG governance operating model
- Portfolio ESG data collection
- Regulatory roadmap
- Evidence and control framework

## Naming Rules

- Prefer one canonical label over near-duplicates.
- Keep labels short enough for filter controls and badges.
- Use the same labels in data, filters, and visible UI.
- If a label changes, check filters, quick views, assessment logic, and regulation detail rendering.
- Avoid adding local shorthand that only one component understands.

## Context Maintenance

When a label is added, renamed or removed in `data/taxonomy.ts`, `data/sectors.ts` or record data, update this file and check:

- filter options
- quick views
- assessment logic
- regulation table rendering
- regulation detail badges
- sector heatmap labels
