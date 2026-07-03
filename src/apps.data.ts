import {
  Mail,
  ServerCog,
  ShieldCheck,
  GraduationCap,
  Database,
  Calendar,
  CalendarCheck,
  Activity,
  Flame,
  LineChart,
  Cloud,
} from 'lucide-vue-next';
import type { Component } from 'vue';

export interface AppLink {
  name: string;
  description: string;
  url: string;
  icon: Component;
  category: string;
  /** color de acento sutil para el icono */
  accent: string;
}

export const APPS: AppLink[] = [
  {
    name: 'Roundcube',
    description: 'Webmail para leer y enviar correos.',
    url: 'http://192.168.10.26:8070',
    icon: Mail,
    category: 'Correo',
    accent: '#2563eb',
  },
  {
    name: 'Postfix Admin',
    description: 'Administración de dominios y cuentas de correo.',
    url: 'http://192.168.10.26:8080',
    icon: ServerCog,
    category: 'Correo',
    accent: '#4f46e5',
  },
  {
    name: 'Rspamd',
    description: 'Filtro antispam y control del correo.',
    url: 'http://192.168.10.26:11334',
    icon: ShieldCheck,
    category: 'Correo',
    accent: '#dc2626',
  },
  {
    name: 'Moodle',
    description: 'Plataforma de cursos y aprendizaje en línea.',
    url: 'http://192.168.10.26:3000',
    icon: GraduationCap,
    category: 'Educación',
    accent: '#ea580c',
  },
  {
    name: 'phpMyAdmin',
    description: 'Gestor web de bases de datos MySQL/MariaDB.',
    url: 'http://192.168.10.26:9000',
    icon: Database,
    category: 'Base de datos',
    accent: '#ca8a04',
  },
  {
    name: 'Baïkal',
    description: 'Servidor de calendarios y contactos (CalDAV/CardDAV).',
    url: 'http://192.168.10.26:7080/admin/',
    icon: Calendar,
    category: 'Calendario y contactos',
    accent: '#0d9488',
  },
  {
    name: 'Radicale',
    description: 'Servidor ligero de calendarios y contactos.',
    url: 'http://192.168.10.26:7070',
    icon: CalendarCheck,
    category: 'Calendario y contactos',
    accent: '#0891b2',
  },
  {
    name: 'Uptime Kuma',
    description: 'Monitor de disponibilidad de servicios.',
    url: 'http://192.168.10.26:2001',
    icon: Activity,
    category: 'Monitoreo',
    accent: '#16a34a',
  },
  {
    name: 'Prometheus',
    description: 'Recolección de métricas del sistema.',
    url: 'http://192.168.10.26:2002',
    icon: Flame,
    category: 'Monitoreo',
    accent: '#e11d48',
  },
  {
    name: 'Grafana',
    description: 'Paneles y gráficas de métricas.',
    url: 'http://192.168.10.26:2003',
    icon: LineChart,
    category: 'Monitoreo',
    accent: '#d97706',
  },
  {
    name: 'Coolify',
    description: 'Panel de despliegue y gestión de contenedores.',
    url: 'http://192.168.10.26:8000',
    icon: Cloud,
    category: 'Infraestructura',
    accent: '#7c3aed',
  },
];
