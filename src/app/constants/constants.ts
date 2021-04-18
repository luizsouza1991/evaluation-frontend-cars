import { environment } from '../../environments/environment';

export const Constant = {
    BASE_URL: environment.path,
    CAR: 'veiculos/',
    MARCAS: [
        {
            'nome': 'Honda'
        },
        {
            'nome': 'Volkswagen'
        },
        {
            'nome': 'Chevrolet'
        },
        {
            'nome': 'Fiat'
        },
        {
            'nome': 'Ford'
        }
    ]
}