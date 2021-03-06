﻿// (c) Microsoft. All rights reserved

using CHBase.Foundation;
using System;
using System.Xml.Serialization;

namespace CHBase.Types
{
    public sealed class Location : IHealthVaultType
    {
        [XmlElement("country", Order = 1)]
        public string Country { get; set; }

        [XmlElement("state-province", Order = 2)]
        public string State { get; set; }

        public void Validate()
        {
            Country.ValidateRequired("Country");
            if (!String.IsNullOrEmpty(State))
            {
                State.ValidateRequired("State");
            }
        }
    }
}
