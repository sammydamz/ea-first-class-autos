\# EA First Class Autos – Car Listing Website Requirements (Final Version)

\---

\#\# 1\. Project Overview

A lightweight, single-vendor car listing platform for \*\*EA First Class Autos\*\*, designed to showcase vehicles with images, flexible specifications, and pricing.

The platform prioritizes:

\- Speed  

\- Simplicity  

\- Direct conversion via WhatsApp  

There is \*\*no user authentication\*\*; all interactions are inquiry-based.

\---

\#\# 2\. Core Objectives

\- Present cars in a clean, structured listing interface  

\- Provide detailed pages with rich media and flexible data  

\- Enable instant inquiries via WhatsApp with pre-filled messages  

\- Maintain a lightweight, easily manageable system  

\---

\#\# 3\. Functional Requirements

\#\#\# 3.1 Car Listings (Catalog Page)

\- Display cars in a grid or list layout  

\- Each car card should include:

  \- Featured image  

  \- Car title (Make, Model, Year)  

  \- Price  

  \- Optional short description  

\- Clicking a car navigates to the \*\*Car Detail Page\*\*

\---

\#\#\# 3.2 Car Detail Page

Each car must have a dedicated page with the following:

\#\#\#\# Media

\- Multiple images (3–6 per car)  

\- Image gallery (carousel or grid)  

\#\#\#\# Basic Information

\- Title (e.g., \*Toyota Corolla 2020\*)  

\- Price  

\- Description (optional)  

\---

\#\#\# 3.3 Dynamic Specifications (Core Update)

\#\#\#\# Definition

Car specifications are \*\*not fixed\*\* and must support varying data inputs from different sellers.

\#\#\#\# Data Structure

Specifications must be stored as \*\*dynamic key-value pairs\*\*:

\`\`\`json

{

  "specifications": \[

    { "label": "Engine", "value": "2.0L" },

    { "label": "Transmission", "value": "Automatic" },

    { "label": "Mileage", "value": "30,000 km" }

  \]

}

#### Behavior

* Any number of specifications can be added  
* No required fields  
* Only available data is displayed  
* No empty placeholders should appear in the UI

#### Frontend Rendering

* Specifications must be dynamically looped and displayed  
* Order should follow input order

---

### 3.4 WhatsApp Inquiry Integration (Primary Conversion Feature)

#### Definition

Each car detail page must include a **WhatsApp “Enquire” button** that opens a chat with a pre-filled message.

---

#### Message Requirements

The message must dynamically include:

* Car title  
* Price  
* Selected specifications  
* Page link

---

#### Message Format (Example)

Hello, I’m interested in this car:

Toyota Corolla 2020  

Price: $15,000  

Specifications:

Engine: 2.0L  

Transmission: Automatic  

Mileage: 30,000 km  

Link: https://yourwebsite.com/car/toyota-corolla-2020

---

#### Implementation

Use WhatsApp Click-to-Chat:

https://wa.me/\<phone\_number\>?text=\<encoded\_message\>

* Message must be **URL-encoded**  
* Data must be dynamically generated per car

---

## 4\. Non-Functional Requirements

### 4.1 Performance

* Fast load times  
* Optimized images  
* Minimal backend overhead

---

### 4.2 Responsiveness

* Fully mobile responsive  
* Mobile-first design (optimized for WhatsApp usage)

---

### 4.3 SEO

* Unique URL per car  
* Metadata (title and description per listing)

---

## 5\. Technical Stack

### Frontend

* Next.js (recommended) or React  
* Tailwind CSS

---

### Backend / Data Storage

Lightweight options:

* NEON

---

### Image Storage

* UploadThing (for hosting and managing images)

---

## 6\. Data Model (Final)

{

  "id": "string",

  "title": "Toyota Corolla 2020",

  "price": 15000,

  "images": \["url1", "url2", "url3"\],

  "description": "Clean car, low mileage",

  "specifications": \[

    { "label": "Engine", "value": "2.0L" },

    { "label": "Transmission", "value": "Automatic" }

  \]

}

---

## 7\. Admin / Content Management

### Requirement

A simple way to add and manage cars.

---

### Input Handling

* Admin must be able to:  
    
  * Add multiple images  
  * Enter title and price  
  * Add **dynamic specifications** (label \+ value pairs)

---

### Optional Enhancements

* Add/remove spec fields dynamically in UI  
* Paste-and-parse input support

---

## 8\. User Flow

1. User visits homepage  
2. Browses available cars  
3. Selects a car  
4. Views details and specifications  
5. Clicks **“Chat on WhatsApp”**  
6. Redirected to WhatsApp with pre-filled message

---

## 9\. Future Enhancements (Optional)

* Search and filtering (price, brand, year) (we need this ASAP)  
* Featured listings (Later)

---

## 10\. Key Design Principles

* **Flexibility:** Specifications must support any format  
* **Simplicity:** Minimal system complexity  
* **Performance:** Fast and lightweight  
* **Conversion-first:** Optimize for WhatsApp inquiries

---

## Final Note

The system is intentionally designed to be **schema-light and adaptable**, ensuring that inconsistent seller data does not break the structure or require constant developer intervention.

