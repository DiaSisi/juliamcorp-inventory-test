# Juliam Corp - Prueba Técnica de Inventario

Aquí presento mi solución para el problema de control de inventario de la empresa. El proyecto incluye desde una solución rápida en Excel, hasta una aplicación web (MVP) y el plan para escalar todo a futuro.

*(Nota: Aunque he resumido la documentación principal aquí, decidí conservar los archivos originales `diagnostico.md` y `arquitectura.md` en el repositorio para que puedan revisar el historial y ver cómo fue el proceso).*

---

## 1. Documento Operativo

### El Problema (Diagnóstico)
Actualmente el almacén está descontrolado porque usan muchos Excel distintos. Al no tener un registro centralizado, el equipo de ventas asume que hay stock que en realidad no existe en físico, lo que provoca ventas fallidas o compras innecesarias de mercancía.

### Fase A: Solución temporal (Contingencia)
Mientras se implementa el sistema web, preparé una plantilla de Excel unificada que pueden encontrar en la carpeta `/contingencia`. 

**Instrucciones para el equipo de almacén:**
1. Abran el archivo `INVENTARIO PROVICIONAL`.
2. Cada producto nuevo va en una sola fila con su respectivo código SKU.
3. El equipo solo debe actualizar manualmente las columnas de "Stock Físico" (lo que cuentan en los estantes) y "Comprometido" (lo que ya está vendido y apartado).
4. El Excel calculará solo el "Stock Disponible". Es vital que todo el equipo trabaje únicamente sobre este archivo compartido en la nube (Google Sheets) para evitar las confusiones de antes.

---

## 2. Documento Técnico

### Fase B: El MVP (Aplicación Web)
