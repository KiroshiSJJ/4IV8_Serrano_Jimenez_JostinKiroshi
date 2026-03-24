import java.util.Locale;
import java.util.Scanner; // Importación necesaria

public class Examen_Primer_Parcial {
    public static void main(String[] args) {
        // Configuramos el scanner para usar el punto decimal (.)
        Scanner sc = new Scanner(System.in).useLocale(Locale.US);
        int opcion;

        // Constantes de precios por metro cuadrado
        final double PRECIO_PORCELANATO = 13.45;
        final double PRECIO_ENMARMOLADO = 43.95;
        final double PRECIO_ACRILICO = 39.24;
        final double IVA = 0.16;
        final double DESCUENTO = 0.0725;

        do {
            System.out.println("\n--- SISTEMA DE COTIZACIÓN DE PISOS ---");
            System.out.println("1. Realizar nueva cotización");
            System.out.println("2. Salir");
            System.out.print("Seleccione una opción: ");
            
            // Validación para evitar errores si el usuario no ingresa un número en el menú
            while (!sc.hasNextInt()) {
                System.out.println("Por favor, ingresa un número válido.");
                sc.next();
            }
            opcion = sc.nextInt();
            sc.nextLine(); // Limpiar el buffer después de leer el número

            if (opcion == 1) {
                // Entrada de datos
                System.out.print("Ingrese nombre completo del comprador: ");
                String nombre = sc.nextLine();

                System.out.print("Ingrese el ancho del área (metros, ej: 5.5): ");
                double ancho = sc.nextDouble();

                System.out.print("Ingrese el largo del área (metros, ej: 4.2): ");
                double largo = sc.nextDouble();

                // Validación de medidas
                if (ancho <= 0 || largo <= 0) {
                    System.out.println("Error: Las medidas deben ser mayores a cero.");
                    continue;
                }

                double m2 = ancho * largo;

                // Cálculos base
                double costoPorcelanato = m2 * PRECIO_PORCELANATO;
                double costoEnmarmolado = m2 * PRECIO_ENMARMOLADO;
                double costoAcricilo = m2 * PRECIO_ACRILICO;

                // Mostrar opciones al usuario
                System.out.println("\n--- RESULTADOS PARA: " + nombre.toUpperCase() + " ---");
                System.out.println("Área total: " + String.format("%.2f", m2) + " m2");
                System.out.println("1. Porcelanato: $" + String.format("%.2f", costoPorcelanato));
                System.out.println("2. Enmarmolado: $" + String.format("%.2f", costoEnmarmolado));
                System.out.println("3. Acrílico:    $" + String.format("%.2f", costoAcricilo));

                // Proceso de compra
                System.out.print("\n¿Desea realizar la compra? Seleccione (1-3) o (0) para cancelar: ");
                int seleccionCompra = sc.nextInt();

                if (seleccionCompra >= 1 && seleccionCompra <= 3) {
                    double subtotal = 0;
                    if (seleccionCompra == 1) subtotal = costoPorcelanato;
                    else if (seleccionCompra == 2) subtotal = costoEnmarmolado;
                    else subtotal = costoAcricilo;

                    // Aplicar Descuento e Impuestos
                    double montoDescuento = subtotal * DESCUENTO;
                    double subtotalConDescuento = subtotal - montoDescuento;
                    double montoIva = subtotalConDescuento * IVA;
                    double totalFinal = subtotalConDescuento + montoIva;

                    System.out.println("\n--- TICKET DE VENTA ---");
                    System.out.println("Costo Base:     $" + String.format("%.2f", subtotal));
                    System.out.println("Descuento (7.25%): -$" + String.format("%.2f", montoDescuento));
                    System.out.println("IVA (16%):       +$" + String.format("%.2f", montoIva));
                    System.out.println("TOTAL A PAGAR:  $" + String.format("%.2f", totalFinal));
                }

            } else if (opcion != 2) {
                System.out.println("Opción no válida.");
            }

        } while (opcion != 2);

        System.out.println("Programa finalizado.");
        sc.close();
    }
}