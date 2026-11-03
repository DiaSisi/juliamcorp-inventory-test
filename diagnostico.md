# Diagnóstico Inicial: Resolución de Incidencias e Infraestructura de Inventario
**Empresa:** Juliam Corp LLC.
**Candidata:** Diana Gomes Sisiruca | Desarrolladora Mid-Level. 
**Fecha:** 03/11/2026.

## 1. Análisis de las Causas
La ruptura de la cadena de suministro y el descontrol del inventario físico en el almacén central no son fallas del personal, sino un colapso natural de una arquitectura de datos no escalable. Las causas principales son:

*   **Fragmentación de Datos (Falta de SSOT):** La creación de múltiples archivos Excel paralelos eliminó la "Única Fuente de Verdad" (Single Source of Truth). Los datos de entrada y salida se están registrando de forma aislada, generando discrepancias inmediatas.
*   **Ausencia de Control de Concurrencia:** Los archivos de Excel manuales no soportan transacciones simultáneas de múltiples operadores (ACID). Esto provoca sobreescritura de datos o pérdida de trazabilidad cuando el almacén opera a alto ritmo.
*   **Falta de Estandarización:** La incorporación de nuevos miembros sin una herramienta centralizada con validación de entradas permitió que el proceso operativo dependiera del criterio individual de cada operador en lugar de un sistema unificado.

## 2. Procesos de Negocio Impactados
El colapso del control de datos está generando un efecto dominó en las siguientes áreas críticas:
1.  **Logística y Despacho (Cuello de botella actual):** La imposibilidad de ubicar o confirmar existencias está deteniendo la línea de preparación de pedidos, causando las filas y la fricción directa con los clientes.
2.  **Ventas y Experiencia del Cliente:** La pérdida de confianza en la disponibilidad real del producto genera ventas perdidas (costo de oportunidad) y deterioro de la relación comercial con los distribuidores.
3.  **Compras y Reabastecimiento (Riesgo Financiero Crítico):** Al desconocer el inventario físico (frente a las órdenes de compra despachadas), el departamento de compras está operando a ciegas. Se corre el riesgo inminente de comprar mercancía ya existente (capital inmovilizado) o no pedir insumos críticos a tiempo (quiebre de stock).

## 3. Estructura de Datos Mínima Necesaria (Recuperación Operativa)
Para retomar la visibilidad del almacén en menos de una semana, debemos ejecutar un conteo físico rápido (ciclo de inventario) y colocarlo en una estructura de datos transitoria unificada y rígida. La tabla mínima indispensable para operar es:

*   **SKU / ID de Producto:** Identificador único alfanumérico.
*   **Descripción / Nombre:** (Ej. Contenedor de plástico 500ml).
*   **Categoría:** (Plástico, Vidrio, Desechables).
*   **Unidad de Medida:** (Caja, Paquete, Unidad).
*   **Stock Físico Real:** Cantidad actual tras el conteo de emergencia.
*   **Stock Comprometido:** Cantidad vendida (según órdenes de compra pendientes de entrega) que aún no sale del almacén.
*   **Stock Disponible:** (`Stock Físico Real` - `Stock Comprometido`). Este es el número real para ventas.
*   **Punto de Reorden (Min Stock):** Nivel mínimo que dispara la alerta de compra urgente.

**Siguiente paso estratégico (Fase A - Contingencia):** Desplegar una herramienta Low-Code colaborativa (ej. Google Sheets protegido o un Excel en SharePoint con permisos restrictivos y formularios de entrada) para unificar la captura de datos hoy mismo, deteniendo la fuga operativa mientras se desarrolla el MVP centralizado (Fase B).