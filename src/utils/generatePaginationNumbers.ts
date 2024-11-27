

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

    // Sí el número total de páginas es 7 o menos vamos a mostrar
    // todas las páginas sin puntos suspensivos.
    if (totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // Sí la página actual está entre las primeras 3 páginas mostrar las primeras 3,
    // puntos suspensivos, y las últimas 2.
    if (currentPage <= 3) {
        return [1,2,3, '...', totalPages - 1, totalPages];
    }

    // Sí la página actual está entre las últimas 3 páginas,
    // mostrar las primeras 2, puntos suspensivos, y las últimas 3.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    // Sí la página actual está en otro lugar medio, mostrar la primera
    // página, puntos suspensivos, la página actual y siguiente.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]

}