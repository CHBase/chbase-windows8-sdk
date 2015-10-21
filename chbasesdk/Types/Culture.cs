// (c) Microsoft. All rights reserved

using System;
using System.Xml.Serialization;

namespace CHBase.Foundation.Types
{
    public class Culture : IValidatable
    {
        [XmlElement("language")]
        public string Language { get; set; }

        [XmlElement("country")]
        public string Country { get; set; }

        public void Validate()
        {            
        }
    }
}
