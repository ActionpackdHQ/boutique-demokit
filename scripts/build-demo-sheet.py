#!/usr/bin/env python3
"""Build the one-page Actionpackd demo-kit sheet.

Giri Dharshini's direct number is the literal placeholder [GIRI_PHONE_NUMBER].
Do not replace it with a guessed number.
"""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "actionpackd-demo-kit.pdf"
FONT = Path("/usr/share/fonts/truetype/liberation")
GIRI_PHONE_PLACEHOLDER = "[GIRI_PHONE_NUMBER]"

VIOLET = (91, 45, 255)
INK = (28, 18, 36)
MUTED = (72, 64, 82)
PAPER = (246, 241, 234)
GOLD = (245, 196, 0)


class Sheet(FPDF):
    def footer(self):
        self.set_y(-12)
        self.set_font("Lib", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 5, "Actionpackd, Chennai  ·  Demo kit  ·  Samples, not a live shop", align="C")


def section(pdf: Sheet, title: str):
    pdf.ln(3.2)
    pdf.set_font("Lib", "B", 12)
    pdf.set_text_color(*VIOLET)
    pdf.multi_cell(0, 6, title)
    pdf.ln(0.6)
    pdf.set_text_color(*INK)


def body(pdf: Sheet, text: str, size: float = 10, height: float = 4.6):
    pdf.set_font("Lib", "", size)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, height, text)


def main():
    pdf = Sheet(format="A4")
    pdf.set_auto_page_break(auto=False)
    pdf.set_title("Actionpackd demo kit")
    pdf.set_author("Actionpackd")
    pdf.set_subject("Agents, bots, shops, and sites")
    pdf.add_font("Lib", "", str(FONT / "LiberationSans-Regular.ttf"))
    pdf.add_font("Lib", "B", str(FONT / "LiberationSans-Bold.ttf"))
    pdf.add_page()
    pdf.set_fill_color(*PAPER)
    pdf.rect(0, 0, 210, 297, "F")
    pdf.set_fill_color(*VIOLET)
    pdf.rect(0, 0, 210, 14, "F")
    pdf.set_xy(14, 4)
    pdf.set_font("Lib", "B", 11)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 6, "Actionpackd   ·   Demo kit   ·   Chennai")

    pdf.set_xy(14, 20)
    pdf.set_text_color(*INK)
    pdf.set_font("Lib", "B", 18)
    pdf.multi_cell(182, 8, "Your boutique, answering customers 24 hours.")
    pdf.set_x(14)
    body(
        pdf,
        '"Price?" "Size?" "Is this available?" Agents reply for you. They share new arrivals, send payment links, and remind customers about pickup.',
        10.5,
        5,
    )

    section(pdf, "What Actionpackd provides")
    items = [
        "Agents - A worker that qualifies leads, chases payments, books visits, and hands the hot ones to your team.",
        "Bots - A tighter assistant for repeat questions: price, timings, stock, and simple capture.",
        "Shops - A shopfront plus the agent behind it. Catalog, payment links, and pickup reminders, using your photos.",
        "Sites - A public site that explains the offer and sends the visitor to the agent, the shop, or a person.",
    ]
    for item in items:
        pdf.set_x(14)
        body(pdf, item, 10, 4.5)
        pdf.ln(0.8)

    section(pdf, "Boutique agents on this demo")
    pdf.set_x(14)
    body(
        pdf,
        "Shop Agent answers price, size, and stock, and shares new arrivals. Payment Agent sends links and gentle reminders. Follow-up Agent sends pickup and alteration reminders. You see every chat and can step in. Demo Boutique is a sample, not a real shop. Garment photos on the site are labeled samples.",
        10,
        4.5,
    )

    section(pdf, "Try the boutique")
    pdf.set_x(14)
    body(
        pdf,
        "Aavarna boutique demo: https://aavarna-boutique.vercel.app/",
        10,
        4.6,
    )

    section(pdf, "Talk to Actionpackd")
    lines = [
        "Website: https://actionpackd.com",
        "Hello agent: https://hello.actionpackd.com",
        "Actionpackd WhatsApp: +91 81900 07072",
        "https://wa.me/918190007072",
        "Ram Sir, Founder and CEO - message the Actionpackd WhatsApp above.",
        f"Giri Dharshini, Chief Operating Officer - direct number: {GIRI_PHONE_PLACEHOLDER}",
        "That token is a placeholder. It is not a working phone number.",
    ]
    for line in lines:
        pdf.set_x(14)
        body(pdf, line, 10, 4.5)

    y = pdf.get_y() + 6
    pdf.set_fill_color(*GOLD)
    pdf.rect(14, y, 18, 1.4, "F")
    pdf.set_xy(14, y + 3)
    pdf.set_font("Lib", "", 8.5)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        182,
        4,
        "Talk to Ram on the Actionpackd WhatsApp or open the Hello agent. No video in this kit yet. The 60-second demo is marked coming soon on the site.",
    )
    if pdf.get_y() > 284:
        raise SystemExit(f"Footer collision at y={pdf.get_y():.1f}")

    if pdf.page_no() != 1:
        raise SystemExit(f"Expected 1 page, got {pdf.page_no()}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
