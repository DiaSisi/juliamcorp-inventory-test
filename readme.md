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
Esta es la app que construí para reemplazar el Excel definitivamente y automatizar la gestión.
- **Backend:** Hecho con NestJS en el puerto 3000. Es una API REST que maneja la lógica detrás del inventario.
- **Frontend:** Hecho con React y Vite en el puerto 5173. Es un panel sencillo donde el usuario tiene autocompletado y alertas de colores cuando el stock baja del punto de reorden.

### ¿Cómo levantar el proyecto? (Docker)
Preparé todo con contenedores para que sea fácil de probar en cualquier computadora. Solo se necesita tener Docker instalado, abrir la terminal en la raíz del proyecto y correr:
`docker-compose up --build`
Con ese único comando se levantan la API y la interfaz web al mismo tiempo.

### Plan a largo plazo
*(El detalle técnico completo está en el archivo `arquitectura.md`, pero aquí dejo el resumen)*:
Para que esta aplicación aguante el volumen de trabajo real de una empresa B2B, propongo:
1. **Base de Datos:** Migrar a PostgreSQL para que los datos estén completamente seguros y no se pierda información de los recuentos.
2. **Seguridad:** Crear un sistema de usuarios (con tokens JWT). Así los jefes ven todos los reportes, pero los operarios solo pueden modificar las cantidades de stock.
3. **ERP / CRM:** No vale la pena programar un sistema de contabilidad o facturación desde cero. Mi sugerencia es conectar este desarrollo a la medida con el ERP que ya use la empresa mediante una API. Así los operarios del almacén trabajan en una interfaz cómoda y rápida, y el equipo de finanzas sigue teniendo sus datos cuadrados en su sistema de siempre.