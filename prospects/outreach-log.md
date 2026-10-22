# Outreach log

One row per business. Check this before contacting anyone, so nobody is contacted twice.
Status: `built`, `emailed`, `sms-needed` (no public email, so the owner has to text them), `replied`, `won`, `declined`, `unsubscribed`.

| Date | Business | Folder | Live demo | Channel | Status | Notes |
|---|---|---|---|---|---|---|
| 2026-10-22 | Cafe The Beans, Dulwich Hill | cafe-the-beans | https://cafe-the-beans.vercel.app | email songfiona1@gmail.com | emailed | Quoted $350 one-off or $150 + $20/mo |
| 2026-10-22 | Mr Poo Plumbing Works, Ingleburn | mr-poo-plumbing | https://mr-poo-plumbing.vercel.app | SMS 0417 271 270 | texted | First text wrongly said mrpoo.com.au was down. It's live, just a bare GoDaddy page with a contact form. Correction text in README |
| 2026-10-22 | Gary Renouf Plumbing, Gladesville | gary-renouf-plumbing | https://gary-renouf-plumbing.vercel.app | SMS 0418 265 530 | declined | NOT A LEAD: garyrenoufplumbing.com.au is a working, full site. Apology text in README. Don't contact again |
| 2026-10-22 | Surry Cutters, Surry Hills | surry-cutters | https://surry-cutters.vercel.app | email surrycutters@bigpond.com | emailed | No website (no DNS for surrycutters.com.au) |
| 2026-10-22 | M V Motors, Liverpool | mv-motors | https://mv-motors-rho.vercel.app | email mvmotors.Liverpool@gmail.com | emailed | No website (no DNS for mvmotors.com.au) |
| 2026-10-22 | Tapered The Barbershop, Quakers Hill | tapered-the-barbershop | https://tapered-the-barbershop.vercel.app | email taperedthebarbershop@gmail.com | emailed | Instagram only (@taperedthebarbershop) |

## Skipped after checking
- Autocure Mobile Mechanics: has autocuremobilemechanics.com.au
- Sydney Electrical And Maintenance: has sydneyelectricalmaintenance.com.au
- Barber's Deluxe: has barbersdeluxe.com.au

## How to check whether a site is dead
Don't trust a failed `curl` from the sandbox: the egress proxy refuses some hosts, which looks the same as a dead site.
Use DNS (`https://dns.google/resolve?name=<domain>`; Status 3 means the domain doesn't exist) and confirm with WebFetch.
