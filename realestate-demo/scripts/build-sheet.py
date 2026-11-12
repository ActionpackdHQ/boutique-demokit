#!/usr/bin/env python3
"""Build the one-page real estate agent sheet.

Same sheet language as the boutique kit: maroon title, three sample
photos, a ruled team table, and a green contact bar. One A4 page.
"""

from pathlib import Path

from fpdf import FPDF
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "actionpackd-realestate-sheet.pdf"
KIT = ROOT / "public" / "kit"
FONT = Path("/usr/share/fonts/truetype/liberation")

MAROON = (122, 31, 61)
INK = (42, 26, 31)
GREEN = (37, 211, 102)
LINE = (221, 221, 221)
GRAY = (119, 119, 119)
WHITE = (255, 255, 255)

WHATSAPP = (
    "https://wa.me/918190007072?text="
    "Hi%2C%20I%27d%20like%20an%20AI%20agent%20for%20my%20real%20estate%20business."
)

CARDS = [
    (
        "Lead Qualifier",
        "Asks area, budget, BHK and timeline while the buyer is still excited. Only serious buyers reach you.",
    ),
    (
        "Brochure Desk",
        'Sends photos, floor plans and the location pin the moment they ask. No "will send tomorrow".',
    ),
    (
        "Site Visit Booker",
        "Locks the Sunday visit and reminds them the night before, so no one forgets to show up.",
    ),
    (
        "You still close the deal.",
        "Every chat is in front of you, and you can jump in whenever you want.",
    ),
]


def rounded_photo(src: Path, dest: Path, size: int = 560, radius: int = 36) -> None:
    image = Image.open(src).convert("RGB").resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    background = Image.new("RGB", (size, size), WHITE)
    background.paste(image, mask=mask)
    background.save(dest, "JPEG", quality=84, optimize=True)


def main() -> None:
    tmp = Path("/tmp/realestate-sheet-photos")
    tmp.mkdir(exist_ok=True)
    photos = []
    for name in ("villa", "living", "model"):
        dest = tmp / f"{name}.jpg"
        rounded_photo(KIT / f"{name}.webp", dest)
        photos.append(dest)

    pdf = FPDF(format="A4", unit="pt")
    pdf.set_auto_page_break(auto=False)
    pdf.set_title("Every buyer enquiry, answered in seconds.")
    pdf.set_author("Actionpackd")
    pdf.set_subject("AI agents for real estate")
    pdf.add_font("Lib", "", str(FONT / "LiberationSans-Regular.ttf"))
    pdf.add_font("Lib", "B", str(FONT / "LiberationSans-Bold.ttf"))
    pdf.add_page()
    pdf.set_fill_color(*WHITE)
    pdf.rect(0, 0, 595, 842, "F")

    pdf.set_xy(45.8, 42)
    pdf.set_font("Lib", "B", 18)
    pdf.set_text_color(*MAROON)
    title = "Every buyer enquiry, answered in seconds."
    if pdf.get_string_width(title) > 504:
        raise SystemExit("Headline is wider than the sheet")
    pdf.cell(504, 24, title)

    pdf.set_xy(45.8, 72)
    pdf.set_font("Lib", "", 11.5)
    pdf.set_text_color(*INK)
    pdf.multi_cell(
        504,
        15,
        "An AI agent on WhatsApp qualifies buyers, shares project photos and brochures, and books site visits, day or night.",
    )

    image_y = 112
    image_size = 156
    for index, photo in enumerate(photos):
        pdf.image(photo, x=45.75 + index * 166.5, y=image_y, w=image_size, h=image_size)

    header_y = 282
    header_h = 26
    pdf.set_fill_color(*MAROON)
    pdf.rect(45.8, header_y, 168, header_h, "F")
    pdf.rect(218.8, header_y, 331, header_h, "F")
    pdf.set_font("Lib", "B", 12)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(54, header_y + 5)
    pdf.cell(150, 16, "Your team")
    pdf.set_xy(228, header_y + 5)
    pdf.cell(310, 16, "What the AI agent does")

    y = header_y + header_h
    left_w = 168
    right_w = 331
    right_x = 218.8
    for title, body in CARDS:
        pdf.set_font("Lib", "", 10.5)
        lines = pdf.multi_cell(right_w - 18, 13.5, body, dry_run=True, output="LINES")
        row_h = max(36, 12 + len(lines) * 13.5)
        pdf.set_font("Lib", "B", 10.5)
        pdf.set_text_color(*INK)
        pdf.set_xy(54, y + 10)
        pdf.multi_cell(left_w - 16, 13.5, title)
        pdf.set_font("Lib", "", 10.5)
        pdf.set_xy(right_x + 9, y + 8)
        pdf.multi_cell(right_w - 18, 13.5, body)
        line_y = y + row_h
        pdf.set_fill_color(*LINE)
        pdf.rect(45.8, line_y - 0.7, left_w, 0.7, "F")
        pdf.rect(right_x, line_y - 0.7, right_w, 0.7, "F")
        y = line_y

    bar_y = y + 18
    bar_h = 78
    pdf.set_fill_color(*GREEN)
    pdf.rect(45.8, bar_y, 504, bar_h, "F", round_corners=True, corner_radius=10)
    pdf.set_font("Lib", "B", 13)
    pdf.set_text_color(*WHITE)
    contacts = [
        ("+91 81900 07072", WHATSAPP),
        ("actionpackd.com", "https://actionpackd.com"),
        ("hello.actionpackd.com", "https://hello.actionpackd.com"),
    ]
    for index, (label, href) in enumerate(contacts):
        line_y = bar_y + 8 + index * 22
        pdf.set_xy(45.8, line_y)
        pdf.cell(504, 18, label, align="C", link=href)

    pdf.set_xy(45.8, bar_y + bar_h + 8)
    pdf.set_font("Lib", "", 8.2)
    pdf.set_text_color(*GRAY)
    pdf.cell(504, 12, "Sample project photos. Not a live listing.")

    if pdf.page_no() != 1:
        raise SystemExit(f"Expected 1 page, got {pdf.page_no()}")
    if bar_y + bar_h > 800:
        raise SystemExit("Contact bar runs off the page")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
